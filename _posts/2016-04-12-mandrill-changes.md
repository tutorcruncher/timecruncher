---
layout: post
title:  "Mandrill Changes"
permalink: mandrill-changes
author: Mark, Tom and Samuel
---
All of those using TutorCruncher will also be using Mandrill. It's our transactional email client, 
and is used every time you send and email, such as sending an invoice, welcoming a new client or even sending lesson reminders. 
It’s a crucial part of the system that allows you to communicate and market to your customers.

Mandrill is currently in the process of rolling out some big changes to the way they work, both in terms 
of its integration with MailChimp, tighter security rules and its pricing structure.

Some of these changes are quite frustrating but we believe, even after the switch that Mandrill & MailChimp are the best service to use.

​<a href="/img/blogs/mandrill_monkey.jpg" data-lightbox="lightbox" data-title="Mandrill is a type of monkey" class="thumbnail">
  <img src="/img/blogs/mandrill_monkey.jpg" alt-text="Mandrill is a type of monkey"/>
  <figcaption>A Mandrill is a type of Monkey.</figcaption>


Our customers will have received an email from us outlining the changes and how they are effected.

## Why do we use Mandrill?

There are a range of transactional email clients on the market with different compromises to be made in terms of features and price. We chose to integrate Mandrill with TutorCruncher for a couple of reasons. Firstly, it is the most powerful analytic tools compared to other options, which includes an intuitive and easy-to-use api. But much more importantly, they offered the best 'deliverability' performance of any comparable system. There is no point sending emails out if they don’t end up in the inboxes of your customers so we made 'deliverability' a very high priority when we made that choice.

## The changes

As of April 27th, Mandrill will cease to be a standalone service and become an add on to MailChimp, which is their parent company. This has resulted in a 400% rise in our costs. However, they are the most effective and efficient way for us to give our clients the service they expect, so we will continue to use their service.

There will also be security changes introduced for companies that send emails from their own email addresses; this is to stop anyone else sending emails from your domain.

More information on these changes can be found on Mandrill's website, [here](http://blog.mandrill.com/important-changes-to-mandrill.html).

## How these changes affect our users

In terms of pricing, because we believe that Mandrill provide us and you the best service, we will absorb the extra costs.

All companies that wish to send emails from their own email addresses will need to verify and configure SPF and DKIM records for all active sending domains.

**As of April 27th, any emails attempting to send from an unapproved domain will instead be sent from noreply@tutorcruncher.com.**

For example, we at TutorCruncher are sending emails from tom@tutorcruncher.com and info@tutorcruncher.com, so I have gone to my [Email Styles](https://secure.tutorcruncher.com/comms/emailstyle/list/) and made sure that I have added SPF and DKIM records for [tutorcruncher.com](http://www.tutorcruncher.com), as well as verifying the domain by sending an email to one of the addresses eg. tom@tutorcruncher.com.

[Click here to view our guide](http://help.tutorcruncher.com/verifying-domain/).

In the past couple of weeks we have built tools into TutorCruncher to help you, which can be seen if you go to each of your Email Styles.

![](https://tutorcruncher-public.s3.amazonaws.com/meta/mandrill_unapproved-md.png) ![](https://tutorcruncher-public.s3.amazonaws.com/meta/mandrill-approved-md.png)

## What else will these changes effect?

Though these changes may be frustrating, they will mean your emails are much more secure. It should also improve your delivery rate (although most TutorCruncher clients already have excellent delivery rates). Currently Mandrill allow this security, but until April 27th is not mandatory, so anyone can send an email from your business email address.

If you currently send emails from MailChimp, you will need to verify your domains inside MailChimp as well as TutorCruncher.

We will of course be on hand to answer any questions, though please note we cannot add your SPF and DKIM records for you; you may need to contact the person who manages your website.

## Going Forward

We're not wedded to Mandrill and it's quite possible that a competitor will emerge offering a similarly 
rich feature set, better pricing and customer service. We'll continue to review the market and think about moving away from Mailchimp.

If we do choose to make a change we'll give all our customers suitable warning and make sure the change over is as smooth as possible.

If you have any questions, feel free to [contact us](/contact/).
