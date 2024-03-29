USE [Resolvely]
GO
/****** Object:  StoredProcedure [dbo].[EventTypes_SelectAll]    Script Date: 11/30/2023 7:39:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Kelvin Hannah
-- Create date: 11/16/2023
-- Description: Selects all event types from dbo.EventTypes to lookup status of events.
-- Code Reviewer: Luca Chitayat

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[EventTypes_SelectAll]


as
/* --TEST CODE--

Execute dbo.EventTypes_SelectAll 

*/

BEGIN

SELECT [Id]
      ,[Name]
  FROM [dbo].[EventTypes]

END


GO
