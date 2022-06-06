set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."meeting" (
	"meetingId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"createdAt" timestamp with time zone NOT NULL default now(),
	"dates" TEXT NOT NULL,
	"startTime" TEXT NOT NULL,
	"endTime" TEXT NOT NULL,
	"selectedBlocks" TEXT NOT NULL,
	CONSTRAINT "meeting_pk" PRIMARY KEY ("meetingId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"userName" TEXT NOT NULL,
	"meetingId" serial NOT NULL,
	"createdAt" timestamp with time zone NOT NULL default now(),
	"selectedTimes" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("meetingId") REFERENCES "meeting"("meetingId");
