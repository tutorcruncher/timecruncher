---
layout: about
title: "About TutorCruncher"
permalink: /about/
redirect_from: /our-team/
---

## Where TutorCruncher came from

From 2008 to 2013 Bright Young Things Tuition struggled to find an efficient way of invoicing their clients.
They tried numerous off the shelf tools for invoicing but nothing really worked. 

There were payroll tools but they
had no concept of requiring an invoice before you payed tutors, of course there were invoicing tools too but they did
nothing about generating payment orders. Even for just generating invoices the available packages were way short of
the mark: there was nothing that would satisfactorily drag items onto an invoice so each invoice had to be written
out manually, even once that was complete the complex tax arrangement of paying VAT only on fixing fees not the tutors 
time meant every existing piece of software was way out of its depth.

In the absence of a feasible solution BYT and many other tutoring companies resorted to getting tutors to ask
clients for money directly. This threw up a whole raft of new problems: half the point in an agency is to remove the 
awkwardness of asking for money from the tutor, and once the tutor had the cash what was to stop them pocketing it and
cutting out the company?

The only solution was to manually write out each invoice manually each month. Running a tutoring company where you spend
two weeks of every month writing invoices isn't much fun. There had to be a better way.

The only thing to do was to build a custom system, it seemed mad that a tuition agency needed its own piece of software
but that was how it was. Three systems followed, each was better than the last but dealing with developers and paying 
for a bespoke piece of complex accounting software just for one company was only marginally less painful than writing
out each invoice manually.

## Selling Software

Despite the pain, the result by late 2012 was a pretty usable system. TutorCruncher as it came to be known was 
cloud based and generated satisfactory Invoices and Payment Orders.

The kicker was that once you have a database of Tutors and Clients which you require anyway to generate invoices; you 
can start using the system from customer relationship management (CRM) on the client side and as an employee database
on the tutor side. Without too much work what was once an accounting framework started sending notifications and 
letting tutors apply for jobs. The process of automating the donkey work of running a tutoring company had begun.

It become more and more clear that TutorCruncher was more than just a cool internal tool, other companies started asking
if they could use it and it made sense to share the pretty hefty development budget between a few companies.

But even this wasn't going to last forever. Tutoring companies were understandable weary of outsourcing their admin 
to a competitor. The obvious solution was to split the software into a separate company that could grow and eventually
stand on it's own two feet completely independent of BYT.

TutorCruncher Ltd. was incorporated in February 2013, and through 2013 and the first half of 2014 we sold TutorCruncher
to private tuition companies in the UK and around the world.

While growth was good TutorCruncher itself had started to creak under the weight of growth. TutorCruncher 1 was written in C# and
deployed using Windows IIS; the windows environment is pretty much obsolete for modern web applications and in an age 
of [cattle over pets](https://blog.engineyard.com/2014/pets-vs-cattle) the TutorCruncher 1 serve was very much a pet. Also TutorCruncher 1 had
been developed offshore, while we knew the developers and trusted them it was clearly time to move all development 
in house - people were relying on us to manage admin and data and we had to be the ultimate experts in the system we 
were selling.

## TutorCruncher 2

With the recruitment of Samuel as our CTO we agreed it was time to put TutorCruncher 1 to bed and start building something new, 
something which learnt the lessons of all the systems which went before but which was developed from the beginning to
meet the demands of a modern tutoring company. 

Meet TutorCruncher 2; the product of 7 years in the tuition industry and 18 months flat out development. TC2 has a 
vastly increased range of capabilities compared to it's predecessors. TutorCruncher 2 is quickly becoming the gold
standard in how far you can go in automating the boring bits of running an agency leaving you free to concentrate
interesting and ultimately profit generating jobs of running a company.

As well as extending what TutorCruncher does for companies our new system also allows us to cater for a far broader range
of companies:

* Because the system is cloud native and deployed on the PAAS system [Heroku](https://www.heroku.com/) we can scale 
easily. This means we can allow new companies sign up in minutes and existing companies can scale more or less instantly
* Allowing multiple Students and multiple Tutors on a lesson means TutorCruncher can be used to manage tuition centers 
as well as private one-to-one tutoring companies.
* TutorCruncher 2 uses a modified implementation of Django's ugettext translations engine to allow the same framework
to manage multiple different industries.
