USE [Resolvely]
GO
/****** Object:  StoredProcedure [dbo].[Events_Search_Pagination]    Script Date: 1/9/2024 10:02:17 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Kelvin Hannah
-- Create date: 01/02/2024
-- Description: Returns a paginated response, pulling data for all Events matching the query.
-- Code Reviewer: Luca Chitayat

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================
CREATE proc [dbo].[Events_Search_Pagination]
					@PageIndex int
					,@PageSize int
					,@Query nvarchar(150)


as
/* ----TEST CODE----
Declare @PageIndex int = 0
,@PageSize int = 5
,@Query nvarchar(150) = 'z'

Execute dbo.Events_Search_Pagination
@PageIndex
,@PageSize
,@Query
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
  Where(e.Name LIKE '%' + @Query + '%' OR e.Summary LIKE '%' + @Query + '%' OR e.ShortDescription LIKE '%' + @Query + '%')

  ORDER BY e.Id

  OFFSET @offset Rows
  Fetch Next @PageSize Rows ONLY 

END


GO
