---
layout: about
title: About - TimeCruncher
description: Get to know the team and where TimeCruncher came from.
permalink: /about/
---

TimeCruncher Ltd. was incorporated in February 2013 as a privately owned technology company born out of years of 
experience in the administration of tuition businesses. It operates as an exclusively independent entity whilst 
benefiting from its associations with many companies active in the tutoring industry.

## Where TimeCruncher came from

Bright Young Things Tuition struggled to find an efficient way of invoicing their clients.
They tried numerous off-the-shelf tools for invoicing but nothing really worked. 

There were payroll tools but they had no concept of requiring an invoice before you paid tutors. Of course there were invoicing tools too but they did
nothing about generating payment orders. Even for just generating invoices the available packages were way short of
the mark; there was nothing that would satisfactorily drag items onto an invoice so each invoice had to be written
out manually, even once that was complete the complex tax arrangement of [paying VAT only on fixing fees not the tutor's 
time](/features/tax-calculation/) meant every existing piece of software was way out of its depth.

In the absence of a feasible solution BYT and many other tutoring companies resorted to getting tutors to ask
clients for money directly. But this threw up a whole raft of new problems; half the point of an agency is to remove the 
awkwardness of asking for money, card and direct debit payments were impossible and once the tutor had the cash 
what was to stop them pocketing it and cutting out the agency?

The only solution was to write out each invoice manually each month. Running a tutoring company where you spend
two weeks of every month writing invoices isn't much fun. There had to be a better way.

The only thing to do was to build a custom system. It seemed mad that a tuition agency needed its own piece of software
but that was how it was. Three systems followed, each one better than the last; but dealing with developers and paying
for a bespoke piece of complex accounting software just for one company was only marginally less painful than writing out
each invoice manually.

## Selling Software

Despite the pain, TutorCruncher was launched in 2013 as a cloud-based system and generated 
satisfactory Invoices and Payment Orders.

The kicker was that once you have a database of Tutors and Clients (which you require anyway to generate invoices) you 
can start using the system for [customer relationship management (CRM)](/features/crm/) on the client side and as an employee database
on the tutor side. Without too much work what was once an accounting framework started [sending notifications](/features/automated-emails/) and 
letting tutors [apply for jobs](/features/tutor-student-matching/). The process of automating the donkey work of running a tutoring company had begun.

It became increasingly clear that TimeCruncher was more than just a cool internal tool. Other companies started asking
if they could use it too and it made sense to share the hefty development budget between multiple companies.

But even this wasn't going to last forever. Tutoring companies were understandably weary of outsourcing their admin 
to a competitor. The obvious solution was to split the software into a separate company that could grow and eventually
stand on its own two feet completely independent of BYT.

TimeCruncher Ltd. was incorporated in February 2013, and through 2013 and the first half of 2014 we sold TimeCruncher
to private tuition companies in the UK and around the world.

While growth was good, TimeCruncher itself had started to creak under the weight of growth. TimeCruncher 1 was written in C# and
deployed using Windows IIS; the Windows environment is pretty much obsolete for modern web applications and in an age 
of [cattle over pets](https://blog.engineyard.com/2014/pets-vs-cattle) the TimeCruncher 1 server was very much a pet.
Also TimeCruncher 1 had been developed offshore. While we knew the developers and trusted them it was clearly time to
move all development in-house - people were relying on us to manage their admin and data and we had to be the ultimate 
experts in the system we were selling.

## TimeCruncher 2

With the recruitment of Samuel as our CTO we agreed it was time to put TimeCruncher 1 to bed and start building something new,
something which learnt the lessons of all the systems which went before but which was developed from the beginning to
meet the demands of a modern tutoring company. 

Meet TimeCruncher 2, the product of years in the tuition industry and 2 years of flat-out development.
TimeCruncher 2 has a vastly increased range of capabilities compared to its predecessors and is quickly becoming the gold
standard in how far you can go in automating the boring bits of running an agency, leaving you free to concentrate on
the interesting and ultimately profit-generating parts of running your company.

As well as extending what TimeCruncher does for companies our new system also allows us to cater for a far broader range
of companies:

* Because the system is [cloud native](/features/cloud-software/) and deployed on the PAAS system [Heroku](https://www.heroku.com/) we can scale 
easily. This means we can allow new companies to sign up in minutes and existing companies can scale more or less infinitely.
* Allowing [multiple Students and multiple Tutors on a lesson](/features/scheduling/) means TimeCruncher can be used to manage tuition centers
as well as private one-to-one tutoring companies.
* TimeCruncher 2 uses a modified implementation of Django's ugettext translations engine to allow the same framework
to be used in multiple industries.
