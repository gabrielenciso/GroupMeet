set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."meetings" (
	"meetingId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"description" TEXT,
	"dates" text NOT NULL,
	"startTime" json NOT NULL,
	"endTime" json NOT NULL,
	"selectedBlocks" json,
	"createdAt" timestamp with time zone NOT NULL default now(),
	CONSTRAINT "meeting_pk" PRIMARY KEY ("meetingId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"meetingId" serial NOT NULL,
	"userName" TEXT NOT NULL,
	"selectedTimes" json,
	"createdAt" timestamp with time zone NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("meetingId") REFERENCES "meetings"("meetingId");
