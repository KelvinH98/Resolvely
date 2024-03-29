USE [Resolvely]
GO
/****** Object:  StoredProcedure [dbo].[Events_Insert]    Script Date: 11/30/2023 7:39:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Kelvin Hannah
-- Create date: 11/16/2023
-- Description: Insert for Events data using primary keys for EventType & EventStatus. Outputs new Event Id.
-- Code Reviewer:Luca Chitayat

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[Events_Insert]			
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
		   ,@Id int OUTPUT
		   


as
/* --TEST CODE--
	Declare @EventTypeId int = 1
           ,@Name nvarchar(255) = 'College Athletics'
           ,@Summary nvarchar(255) = 'College Athletics Guidance & Assistance'
           ,@ShortDescription nvarchar(4000)= 'Recieve counseling to choose your desired school for athletic programs!'
           ,@VenueId int = 1
           ,@EventStatusId int = 1
           ,@ImageUrl nvarchar(400) = 'https://img.url'
           ,@ExternalSiteUrl nvarchar(400) = 'https://extsite.com'
           ,@IsFree bit = 1
           ,@DateStart datetime2(7) = '20240113'
           ,@DateEnd datetime2(7) = '20240120'
		   ,@CreatedBy int = 2
		   ,@Id int  

Execute dbo.Events_Insert
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
,@Id OUTPUT

Declare @PageIndex int = 0
,@PageSize int = 10

Execute dbo.Events_SelectAll_Pagination
@PageIndex
,@PageSize
*/

BEGIN

INSERT INTO [dbo].[Events]
           ([EventTypeId]
           ,[Name]
           ,[Summary]
           ,[ShortDescription]
           ,[VenueId]
           ,[EventStatusId]
           ,[ImageUrl]
           ,[ExternalSiteUrl]
           ,[IsFree]           
           ,[DateStart]		   
           ,[DateEnd]
		   ,[CreatedBy])
     VALUES
           (@EventTypeId
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
			,@CreatedBy)

			SET @Id = SCOPE_IDENTITY()
END


GO
