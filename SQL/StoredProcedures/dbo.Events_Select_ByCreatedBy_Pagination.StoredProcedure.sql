USE [Resolvely]
GO
/****** Object:  StoredProcedure [dbo].[Events_Select_ByCreatedBy_Pagination]    Script Date: 11/30/2023 7:39:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Kelvin Hannah
-- Create date: 11/20/2023
-- Description: paginated response getting Events data in the order of events createdBy the user joining EventTypes & EventStatus.
-- Code Reviewer: Luca Chitayat

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================
CREATE proc [dbo].[Events_Select_ByCreatedBy_Pagination]
					 
					@PageIndex int
					,@PageSize int
					,@CreatedBy int
as
/*
Declare 
	   @PageIndex int = 0
	   ,@PageSize int = 10
	   ,@CreatedBy int = 2
Execute dbo.Events_Select_ByCreatedBy_Pagination

@PageIndex
,@PageSize
,@CreatedBy
*/

BEGIN
Declare @Offset int = @PageIndex * @PageSize

SELECT e.[Id]
      ,et.Id as [EventId]
	  ,et.Name as [EventName]
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
  WHERE @CreatedBy = e.CreatedBy

  ORDER BY e.DateStart

  OFFSET @offset Rows
  Fetch Next @PageSize Rows ONLY 

End


GO
