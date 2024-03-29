USE [Resolvely]
GO
/****** Object:  StoredProcedure [dbo].[Events_Delete_ById]    Script Date: 11/30/2023 7:39:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Kelvin Hannah
-- Create date: 11/20/2023
-- Description: Deleting specific Events and it's data by Id.
-- Code Reviewer: Luca Chitayat

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================
CREATE proc [dbo].[Events_Delete_ById]
			@Id int


as
/*
Declare @Id int = 2

Execute [dbo].[Events_Delete_ById]
@Id
*/
BEGIN
		DELETE FROM [dbo].[Events]		
		WHERE @Id = Id
END


GO
