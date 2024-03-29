USE [Resolvely]
GO
/****** Object:  StoredProcedure [dbo].[Events_Select_ById]    Script Date: 11/30/2023 7:39:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Kelvin Hannah
-- Create date: 11/20/2023
-- Description: Joins with EventType, EventStatus, & Users tables to pull data for Events and it's data by Id.
-- Code Reviewer: Luca Chitayat

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================
CREATE proc [dbo].[Events_Select_ById]
				@Id int


as
/*
Declare @Id int = 3

Execute dbo.Events_Select_ById 
@Id

*/

BEGIN
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
  FROM [dbo].[Events] as e
  inner join dbo.EventTypes as et on e.EventTypeId = et.Id
  inner join dbo.EventStatus as es on e.EventStatusId = es.Id
  WHERE @Id = e.Id

End


GO
