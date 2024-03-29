USE [Resolvely]
GO
/****** Object:  StoredProcedure [dbo].[Events_SelectAll_Pagination]    Script Date: 11/30/2023 7:39:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Kelvin Hannah
-- Create date: 11/20/2023
-- Description: Returns a paginated response, Joins with EventType, EventStatus, & Users tables to pull data of all Events in the database.
-- Code Reviewer: Luca Chitayat

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[Events_SelectAll_Pagination]
					@PageIndex int
					,@PageSize int



as
/*
Declare @PageIndex int = 0
,@PageSize int = 5

Execute dbo.Events_SelectAll_Pagination
@PageIndex
,@PageSize
*/

BEGIN
Declare @Offset int = @PageIndex * @PageSize

SELECT e.[Id]
	  ,et.Id as EventTypeId
      ,et.Name as [EventType]
      ,e.[Name]
      ,e.[Summary]
      ,e.[ShortDescription]
      ,e.[VenueId]
	  ,es.Id as StatusId
      ,es.Name as [EventStatus]
      ,e.[ImageUrl]
      ,e.[ExternalSiteUrl]
      ,e.[IsFree]
      ,e.[DateCreated]
      ,e.[DateModified]
      ,e.[DateStart]
      ,e.[DateEnd]
      ,dbo.fn_GetUserJSON(e.CreatedBy) as CreatedBy
	  ,TotalCount = COUNT(1)OVER()
  FROM [dbo].[Events] as e
  inner join dbo.EventTypes as et on e.EventTypeId = et.Id
  inner join dbo.EventStatus as es on e.EventStatusId = es.Id
  inner join dbo.Users as u on u.Id = e.CreatedBy

  ORDER BY e.Id

  OFFSET @offset Rows
  Fetch Next @PageSize Rows ONLY 

END


GO
