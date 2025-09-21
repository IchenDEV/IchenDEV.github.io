---
title: UWP获得磁盘空间大小
tags: []
id: '163'
categories:
  - - 'UWP'
date: 2018-08-28 16:34:42
---

在UWP环境中获得磁盘可用空间大小的教程一直没有，研究了几天我成功获得了相关数据。

很多开发win32程序的小伙伴喜欢使用**System.IO.DriveInfo.GetDrives()**，但是在UWP，这个只能获得盘符目录。

下面我介绍一下UWP获得磁盘可用空间大小的方法。

首先你需要一个指向根目录的**StorageFolder**对象，

我们要使用**StorageFolder.Properties.RetrievePropertiesAsync**()获得文件夹信息。

> Namespace:
> 
> [Windows.Storage.FileProperties](https://docs.microsoft.com/zh-cn/uwp/api/windows.storage.fileproperties)
> 
> Assemblies:
> 
> Windows.Storage.FileProperties.dll, Windows.dll
> 
>   
> 
>   
> 
>   
> 
> C# 复制
> 
> ```
> public IAsyncOperation<IDictionary<string, object>> RetrievePropertiesAsync(IEnumerable<String> propertiesToRetrieve)
> ```
> 
>   
> 
> https://docs.microsoft.com/zh-cn/uwp/api/windows.storage.fileproperties.storageitemcontentproperties.retrievepropertiesasync?f1url=https%3A%2F%2Fmsdn.microsoft.com%2Fquery%2Fdev15.query%3FappId%3DDev15IDEF1%26l%3DZH-CN%26k%3Dk(Windows.Storage.FileProperties.StorageItemContentProperties.RetrievePropertiesAsync)%3Bk(TargetFrameworkMoniker-.NETCore%2CVersion%3Dv5.0)%3Bk(DevLang-csharp)%26rd%3Dtrue

这里我们使用**System.FreeSpace**和**System.Capacity**获得空余空间和容量

```
   List<string> list = new List<string>();
                    
   list.Add("System.FreeSpace");
   list.Add("System.Capacity");
   var dc = await Folder.Properties.RetrievePropertiesAsync(list);
   storageFiles.Add(new Disk()
   {
     SpecialPath = SpecialPath.ThisPC,
     DisplayName = Folder.DisplayName,
     IStorageItem = Folder,
     FreeSpace = Convert.ToInt64(dc["System.FreeSpace"]),
    Capacity = Convert.ToInt64(dc["System.Capacity"])
     });

```

可用的属性字符串

> [System.AcquisitionID](https://msdn.microsoft.com/en-us/library/bb760648)
> 
> *   [System.ApplicationName](https://msdn.microsoft.com/en-us/library/bb760650)
> *   [System.Author](https://msdn.microsoft.com/en-us/library/bb760652)
> *   [System.Capacity](https://msdn.microsoft.com/en-us/library/bb760654)
> *   [System.Category](https://msdn.microsoft.com/en-us/library/bb760656)
> *   [System.Comment](https://msdn.microsoft.com/en-us/library/bb760658)
> *   [System.Company](https://msdn.microsoft.com/en-us/library/bb760660)
> *   [System.ComputerName](https://msdn.microsoft.com/en-us/library/bb760662)
> *   [System.ContainedItems](https://msdn.microsoft.com/en-us/library/bb760664)
> *   [System.ContentStatus](https://msdn.microsoft.com/en-us/library/bb760667)
> *   [System.ContentType](https://msdn.microsoft.com/en-us/library/bb760669)
> *   [System.Copyright](https://msdn.microsoft.com/en-us/library/bb760671)
> *   [System.DataObjectFormat](https://msdn.microsoft.com/en-us/library/jj553585)
> *   [System.DateAccessed](https://msdn.microsoft.com/en-us/library/bb760673)
> *   [System.DateAcquired](https://msdn.microsoft.com/en-us/library/bb760675)
> *   [System.DateArchived](https://msdn.microsoft.com/en-us/library/bb760677)
> *   [System.DateCompleted](https://msdn.microsoft.com/en-us/library/bb760679)
> *   [System.DateCreated](https://msdn.microsoft.com/en-us/library/bb760681)
> *   [System.DateImported](https://msdn.microsoft.com/en-us/library/bb760683)
> *   [System.DateModified](https://msdn.microsoft.com/en-us/library/bb760685)
> *   [System.DefaultSaveLocationIconDisplay](https://msdn.microsoft.com/en-us/library/jj553586)
> *   [System.DueDate](https://msdn.microsoft.com/en-us/library/bb760687)
> *   [System.EndDate](https://msdn.microsoft.com/en-us/library/bb760689)
> *   [System.FileAllocationSize](https://msdn.microsoft.com/en-us/library/bb760691)
> *   [System.FileAttributes](https://msdn.microsoft.com/en-us/library/bb760693)
> *   [System.FileCount](https://msdn.microsoft.com/en-us/library/bb760695)
> *   [System.FileDescription](https://msdn.microsoft.com/en-us/library/bb760697)
> *   [System.FileExtension](https://msdn.microsoft.com/en-us/library/bb760699)
> *   [System.FileFRN](https://msdn.microsoft.com/en-us/library/bb760701)
> *   [System.FileName](https://msdn.microsoft.com/en-us/library/bb760703)
> *   [System.FileOwner](https://msdn.microsoft.com/en-us/library/bb760705)
> *   [System.FileVersion](https://msdn.microsoft.com/en-us/library/bb760707)
> *   [System.FindData](https://msdn.microsoft.com/en-us/library/bb760709)
> *   [System.FlagColor](https://msdn.microsoft.com/en-us/library/bb760711)
> *   [System.FlagColorText](https://msdn.microsoft.com/en-us/library/bb760713)
> *   [System.FlagStatus](https://msdn.microsoft.com/en-us/library/bb760715)
> *   [System.FlagStatusText](https://msdn.microsoft.com/en-us/library/bb760717)
> *   [System.FreeSpace](https://msdn.microsoft.com/en-us/library/bb760719)
> *   [System.FullText](https://msdn.microsoft.com/en-us/library/dd391649)
> *   [System.Identity](https://msdn.microsoft.com/en-us/library/bb760721)
> *   [System.Identity.Blob](https://msdn.microsoft.com/en-us/library/dd391652)
> *   [System.Identity.DisplayName](https://msdn.microsoft.com/en-us/library/dd391653)
> *   [System.Identity.IsMeIdentity](https://msdn.microsoft.com/en-us/library/dd391654)
> *   [System.Identity.PrimaryEmailAddress](https://msdn.microsoft.com/en-us/library/dd391655)
> *   [System.Identity.ProviderID](https://msdn.microsoft.com/en-us/library/dd391656)
> *   [System.Identity.UniqueID](https://msdn.microsoft.com/en-us/library/dd391657)
> *   [System.Identity.UserName](https://msdn.microsoft.com/en-us/library/dd391658)
> *   [System.IdentityProvider.Name](https://msdn.microsoft.com/en-us/library/dd391650)
> *   [System.IdentityProvider.Picture](https://msdn.microsoft.com/en-us/library/dd391651)
> *   [System.ImageParsingName](https://msdn.microsoft.com/en-us/library/dd391659)
> *   [System.Importance](https://msdn.microsoft.com/en-us/library/bb760723)
> *   [System.ImportanceText](https://msdn.microsoft.com/en-us/library/bb760725)
> *   [System.IsAttachment](https://msdn.microsoft.com/en-us/library/bb760727)
> *   [System.IsDefaultNonOwnerSaveLocation](https://msdn.microsoft.com/en-us/library/dd391660)
> *   [System.IsDefaultSaveLocation](https://msdn.microsoft.com/en-us/library/dd391661)
> *   [System.IsDeleted](https://msdn.microsoft.com/en-us/library/bb760729)
> *   [System.IsEncrypted](https://msdn.microsoft.com/en-us/library/cc184966)
> *   [System.IsFlagged](https://msdn.microsoft.com/en-us/library/bb760731)
> *   [System.IsFlaggedComplete](https://msdn.microsoft.com/en-us/library/bb760733)
> *   [System.IsIncomplete](https://msdn.microsoft.com/en-us/library/bb760735)
> *   [System.IsLocationSupported](https://msdn.microsoft.com/en-us/library/dd562035)
> *   [System.IsPinnedToNameSpaceTree](https://msdn.microsoft.com/en-us/library/dd391662)
> *   [System.IsRead](https://msdn.microsoft.com/en-us/library/bb760737)
> *   [System.IsSearchOnlyItem](https://msdn.microsoft.com/en-us/library/dd391663)
> *   [System.IsSendToTarget](https://msdn.microsoft.com/en-us/library/bb760739)
> *   [System.IsShared](https://msdn.microsoft.com/en-us/library/bb760741)
> *   [System.ItemAuthors](https://msdn.microsoft.com/en-us/library/bb760743)
> *   [System.ItemClassType](https://msdn.microsoft.com/en-us/library/dd391664)
> *   [System.ItemDate](https://msdn.microsoft.com/en-us/library/bb760745)
> *   [System.ItemFolderNameDisplay](https://msdn.microsoft.com/en-us/library/bb760747)
> *   [System.ItemFolderPathDisplay](https://msdn.microsoft.com/en-us/library/bb760764)
> *   [System.ItemFolderPathDisplayNarrow](https://msdn.microsoft.com/en-us/library/bb760766)
> *   [System.ItemName](https://msdn.microsoft.com/en-us/library/bb760768)
> *   [System.ItemNameDisplay](https://msdn.microsoft.com/en-us/library/bb760770)
> *   [System.ItemNamePrefix](https://msdn.microsoft.com/en-us/library/bb760772)
> *   [System.ItemParticipants](https://msdn.microsoft.com/en-us/library/bb760774)
> *   [System.ItemPathDisplay](https://msdn.microsoft.com/en-us/library/bb760776)
> *   [System.ItemPathDisplayNarrow](https://msdn.microsoft.com/en-us/library/bb760779)
> *   [System.ItemType](https://msdn.microsoft.com/en-us/library/bb760781)
> *   [System.ItemTypeText](https://msdn.microsoft.com/en-us/library/bb760783)
> *   [System.ItemUrl](https://msdn.microsoft.com/en-us/library/bb760785)
> *   [System.Keywords](https://msdn.microsoft.com/en-us/library/bb787519)
> *   [System.Kind](https://msdn.microsoft.com/en-us/library/bb787521)
> *   [System.KindText](https://msdn.microsoft.com/en-us/library/bb787523)
> *   [System.Language](https://msdn.microsoft.com/en-us/library/bb787525)
> *   [System.LayoutPattern.ContentViewModeForBrowse](https://msdn.microsoft.com/en-us/library/dd391667)
> *   [System.LayoutPattern.ContentViewModeForSearch](https://msdn.microsoft.com/en-us/library/dd391668)
> *   [System.LibraryLocationsCount](https://msdn.microsoft.com/en-us/library/jj553597)
> *   [System.MileageInformation](https://msdn.microsoft.com/en-us/library/bb787526)
> *   [System.MIMEType](https://msdn.microsoft.com/en-us/library/bb787528)
> *   [System.Null](https://msdn.microsoft.com/en-us/library/bb787530)
> *   [System.OfflineAvailability](https://msdn.microsoft.com/en-us/library/bb787532)
> *   [System.OfflineStatus](https://msdn.microsoft.com/en-us/library/bb787534)
> *   [System.OriginalFileName](https://msdn.microsoft.com/en-us/library/bb787536)
> *   [System.OwnerSID](https://msdn.microsoft.com/en-us/library/dd391669)
> *   [System.ParentalRating](https://msdn.microsoft.com/en-us/library/bb787538)
> *   [System.ParentalRatingReason](https://msdn.microsoft.com/en-us/library/bb787540)
> *   [System.ParentalRatingsOrganization](https://msdn.microsoft.com/en-us/library/bb787542)
> *   [System.ParsingBindContext](https://msdn.microsoft.com/en-us/library/bb787544)
> *   [System.ParsingName](https://msdn.microsoft.com/en-us/library/bb787546)
> *   [System.ParsingPath](https://msdn.microsoft.com/en-us/library/bb787547)
> *   [System.PerceivedType](https://msdn.microsoft.com/en-us/library/bb787548)
> *   [System.PercentFull](https://msdn.microsoft.com/en-us/library/bb787549)
> *   [System.Priority](https://msdn.microsoft.com/en-us/library/bb787550)
> *   [System.PriorityText](https://msdn.microsoft.com/en-us/library/bb787551)
> *   [System.Project](https://msdn.microsoft.com/en-us/library/bb787552)
> *   [System.ProviderItemID](https://msdn.microsoft.com/en-us/library/bb787553)
> *   [System.Rating](https://msdn.microsoft.com/en-us/library/bb787554)
> *   [System.RatingText](https://msdn.microsoft.com/en-us/library/bb787556)
> *   [System.Sensitivity](https://msdn.microsoft.com/en-us/library/bb787557)
> *   [System.SensitivityText](https://msdn.microsoft.com/en-us/library/bb787558)
> *   [System.SFGAOFlags](https://msdn.microsoft.com/en-us/library/bb787559)
> *   [System.SharedWith](https://msdn.microsoft.com/en-us/library/bb787560)
> *   [System.ShareUserRating](https://msdn.microsoft.com/en-us/library/bb787561)
> *   [System.SharingStatus](https://msdn.microsoft.com/en-us/library/dd391670)
> *   [System.Shell.OmitFromView](https://msdn.microsoft.com/en-us/library/bb787562)
> *   [System.SimpleRating](https://msdn.microsoft.com/en-us/library/bb787564)
> *   [System.Size](https://msdn.microsoft.com/en-us/library/bb787566)
> *   [System.SoftwareUsed](https://msdn.microsoft.com/en-us/library/bb787568)
> *   [System.SourceItem](https://msdn.microsoft.com/en-us/library/bb787570)
> *   [System.StartDate](https://msdn.microsoft.com/en-us/library/bb787572)
> *   [System.Status](https://msdn.microsoft.com/en-us/library/bb787574)
> *   [System.StatusBarSelectedItemCount](https://msdn.microsoft.com/en-us/library/jj553599)
> *   [System.StatusBarViewItemCount](https://msdn.microsoft.com/en-us/library/jj553600)
> *   [System.Subject](https://msdn.microsoft.com/en-us/library/bb787576)
> *   [System.Thumbnail](https://msdn.microsoft.com/en-us/library/bb787578)
> *   [System.ThumbnailCacheId](https://msdn.microsoft.com/en-us/library/bb787580)
> *   [System.ThumbnailStream](https://msdn.microsoft.com/en-us/library/bb787582)
> *   [System.Title](https://msdn.microsoft.com/en-us/library/bb787584)
> *   [System.TotalFileSize](https://msdn.microsoft.com/en-us/library/bb787586)
> *   [System.Trademarks](https://msdn.microsoft.com/en-us/library/bb787588)