USE [Resolvely]
GO
/****** Object:  StoredProcedure [dbo].[EventStatus_SelectAll]    Script Date: 11/30/2023 7:39:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Kelvin Hannah
-- Create date: 11/16/2023
-- Description: Selects all event statuses from dbo.EventStatus to lookup status of events.
-- Code Reviewer: Luca Chitayat

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[EventStatus_SelectAll]


as
/*--TEST CODE--

Execute dbo.EventStatus_SelectAll

*/

BEGIN

SELECT [Id]
      ,[Name]
  FROM [dbo].[EventStatus]

END


GO
