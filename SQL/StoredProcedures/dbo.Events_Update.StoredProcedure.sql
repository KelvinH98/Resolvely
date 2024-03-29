USE [Resolvely]
GO
/****** Object:  StoredProcedure [dbo].[Events_Update]    Script Date: 11/30/2023 7:39:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Kelvin Hannah
-- Create date: 11/20/2023
-- Description: Update Event data for dbo.Events by Id. DateModified set within transaction to "GETUTCDATE()".
-- Code Reviewer: Luca Chitayat

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[Events_Update]
			@EventTypeId int
           ,@Name nvarchar(255)
           ,@Summary nvarchar(255)
           ,@ShortDescription nvarchar(4000)
           ,@VenueId int
           ,@EventStatusId int
           ,@ImageUrl nvarchar(400)
           ,@ExternalSiteUrl nvarchar(400)
           ,@IsFree bit
           ,@DateStart datetime2(7)
           ,@DateEnd datetime2(7)
		   ,@CreatedBy int
		   ,@Id int 


as
/*--TEST CODE--

Declare @PageIndex int = 0
,@PageSize int = 10

Execute dbo.Events_SelectAll_Pagination
@PageIndex
,@PageSize

Declare		@EventTypeId int = 2
           ,@Name nvarchar(255) = 'Career Day'
           ,@Summary nvarchar(255) = 'Career Path Guidance & Assistance'
           ,@ShortDescription nvarchar(4000)= 'Recieve counseling to find a career that fits you!'
           ,@VenueId int = 2
           ,@EventStatusId int = 2
           ,@ImageUrl nvarchar(400) = 'https://img.url'
           ,@ExternalSiteUrl nvarchar(400) = 'https://extsite.com'
           ,@IsFree bit = 1
           ,@DateStart datetime2(7) = '20240115'
           ,@DateEnd datetime2(7) = '20240115'
		   ,@CreatedBy int = 2
		   ,@Id int = 7 

Execute dbo.Events_Update
@EventTypeId
,@Name
,@Summary
,@ShortDescription
,@VenueId
,@EventStatusId
,@ImageUrl
,@ExternalSiteUrl
,@IsFree
,@DateStart
,@DateEnd
,@CreatedBy
,@Id

Execute dbo.Events_SelectAll_Pagination
@PageIndex
,@PageSize
*/

BEGIN

UPDATE [dbo].[Events]
   SET [EventTypeId] = @EventTypeId
      ,[Name] = @Name
      ,[Summary] = @Summary
      ,[ShortDescription] = @ShortDescription
      ,[VenueId] = @VenueId
      ,[EventStatusId] = @EventStatusId
      ,[ImageUrl] = @ImageUrl
      ,[ExternalSiteUrl] = @ExternalSiteUrl
      ,[IsFree] = @IsFree      
      ,[DateStart] = @DateStart
      ,[DateEnd] = @DateEnd
	  ,[CreatedBy] = @CreatedBy
	  ,DateModified = GETUTCDATE()
 WHERE @Id = Id
END


GO
