---
title: UWP文件复制进度指示
tags: []
id: '149'
categories:
  - - 'UWP'
date: 2018-08-27 01:47:10
---

由系统提供的storagefile类提供的copy方法并没有提供可以提供显示进度的方法，在复制大文件时就会很不友好。

下面我提供一种显示进度的方法。

![](https://idevlab.cn/wordpress/wp-content/uploads/2018/08/Capture.png)

复制顾名思义，就是读取再写入。

所以我们通过storagefile读取文件流并写入另一个文件流。

在每一次读取时更新进度。

但是这有一个问题。根据不同缓存区的大小，这个东西不会太实时。如果用来获取速度，由于缓存区大小设置，获得的速度不准确。

有人说吧缓存区调小一点，我明确的告诉你，这个会影响拷贝的速度。

以下是具体代码

我创建了三个CopyFIle方法使可以支持文件夹

```
     private async Task CopyFile(IStorageItem s1, StorageFolder s2)
        {
            RfileID = 0;
            if (s1 is StorageFile s3)
            {
                await CopyFile(s3, s2);
            }
            else if (s1 is StorageFolder s4)
            {
                await CopyFile(s4, s2);
            }
            if (token)
            {
                CurrentCopyStatus = CopyStatus.paused;
                return;
            }
         

        }
        private async Task CopyFile(StorageFolder s1, StorageFolder s2)
        {
            var items = await s1.GetItemsAsync();
            var s3 = await s2.CreateFolderAsync(s1.Name, CreationCollisionOption.OpenIfExists);
            foreach (var item in items)
            {
                if (item is StorageFile file)
                {
                    await CopyFile(file, s3);
                }
                else if (item is StorageFolder folder)
                {
                    await CopyFile(folder, s3);
                }
                if (token)
                {
                    CurrentCopyStatus = CopyStatus.paused;
                    return;
                }
            }



        }
        private async Task CopyFile(StorageFile s1, StorageFolder s2)
        {
            if (fileID > RfileID)
            {
                RfileID++;
            }
            else
            {

                CurrentFileName = s1.Name;
                var size = Convert.ToDouble((await s1.GetBasicPropertiesAsync()).Size);
                Fin = FinishFileSize;
                using (var ReadStream = await s1.OpenAsync(FileAccessMode.Read))
                {
                    using (var WriteStream = await (await s2.CreateFileAsync(s1.Name, CreationCollisionOption.ReplaceExisting)).OpenAsync(FileAccessMode.ReadWrite))
                    {
                        ulong Position = filePosion;
                        for (int i = 0; ; i++)
                        {
                            var buffer = new Windows.Storage.Streams.Buffer(BufferSize);
                            ReadStream.Seek(Position);
                            await ReadStream.ReadAsync(buffer, buffer.Capacity, InputStreamOptions.Partial);
                            WriteStream.Seek(Position);

                            Progress<uint> ip = new Progress<uint>(FileProgress);
                            await WriteStream.WriteAsync(buffer).AsTask(ip);

                            FinishFileSize += buffer.Capacity;

                            await WriteStream.FlushAsync();

                            Position = WriteStream.Position;
                            filePosion = Position;

                            if (buffer.Length < buffer.Capacity)
                            {
                                filePosion = 0;
                                break;
                            }
                            if (token)
                            {
                                CurrentCopyStatus = CopyStatus.paused;
                                return;
                            }
                            GC.Collect();
                        }
                        RfileID++;
                        fileID++;
                    }
                }
            }
        }
```

其中以下代码通过用缓冲区获得Buffer再写入到文件，在写入后更新总共写入的文件字节。

```
        using (var ReadStream = await s1.OpenAsync(FileAccessMode.Read))
                {
                    using (var WriteStream = await (await s2.CreateFileAsync(s1.Name, CreationCollisionOption.ReplaceExisting)).OpenAsync(FileAccessMode.ReadWrite))
                    {
                        ulong Position = filePosion;
                        for (int i = 0; ; i++)
                        {
                            var buffer = new Windows.Storage.Streams.Buffer(BufferSize);
                            ReadStream.Seek(Position);
                            await ReadStream.ReadAsync(buffer, buffer.Capacity, InputStreamOptions.Partial);
                            WriteStream.Seek(Position);

                           
                            await WriteStream.WriteAsync(buffer);

                            FinishFileSize += buffer.Capacity;

                            await WriteStream.FlushAsync();

                            Position = WriteStream.Position;
                            filePosion = Position;

                            if (buffer.Length < buffer.Capacity)//是buffer的容量，不是大小
                            {
                                filePosion = 0;
                                break;
                            }
                            if (token)
                            {
                                CurrentCopyStatus = CopyStatus.paused;
                                return;
                            }
                            GC.Collect();//清理
                        }
                        RfileID++;
                        fileID++;
                    }
                }
```

然后在更新总写入字节数时根据之前算好的文件大小获得进度数据

```
   public ulong FinishFileSize
        {
            get => _finishFileSize;
            set { _finishFileSize = value; CurrentProgress = (double)value / AllFileSize * 100; OnPropertyChanged(); }
        }
```

如果使用数据绑定到UI使用以下代码更新，注意相关类要继承INotifyPropertyChanged

```
  #region 用于数据绑定更新
        public event PropertyChangedEventHandler PropertyChanged = delegate { };

        public async void OnPropertyChanged([CallerMemberName] string propertyName = null)
        {
            try
            {
                await CoreApplication.GetCurrentView().Dispatcher.AwaitableRunAsync(() =>
                {
                    this.PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
                });
            }
            catch (Exception)
            {

            }
        }
        #endregion
```

当然你可以设置计时器来计算copy的大致上的速度，这里不再描述。