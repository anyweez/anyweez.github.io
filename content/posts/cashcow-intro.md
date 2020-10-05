---
title: "Cashcow: flexible financial simulations"
date: 2020-10-04
description: I've been doing a lot of financial modeling in spreadsheets recently and have hit some walls with scenario / "what if" planning. As a result I created a basic programming language that can be used for expressing financial models, with a specific focus on scenario planning. I've successfully transitioned my personal spreadsheets over and have a few other use cases that I'm excited to explore, and the potential audience for a tool like this is something I'm excited to learn more about.
draft: false
---

Cashcow is a tool for simulating longer-term financial projections with a focus on answering questions that start with "what if." I'm currently using this for my own personal finances, but there are some other use cases I'm interested to explore documented below.

Example questions I want to be able to answer:

* What if I start investing $250 / month into my mutual fund after my next raise instead of $100? What will that mean for my retirement?
* What if I hold off on buying a house for two years?
* What if I take a job that meaningfully increases or decreases my salary? What will be the longer-term impact of being unemployed for six months?
* What income do I need to maintain to support a family with two kids if I want to pay off my house in 15 years?

These were the types of questions that my spreadsheet-based approach struggled to answer without a bunch of work.

## Prior work and my approach

There are plenty of personal finance tools out there, and many of them are really slick. The issue I've encountered with the ones I've used is that scenario analysis requires more flexibility than most tools I've used account for -- its difficult to express all of the scenarios you want to compare. I also tend to be pretty picky about which companies I share my personal finances with, and generally don't like linking all of my accounts to one provider.

The lack of expressiveness problem was familiar; this is the same reason that programming is done with code and not with drag-and-drop interfaces (most of the time, at least!). The approach I'm testing out, therefore, is to create a simple domain-speific programming language that makes it easy to describe a financial configuration and then run that configuration through a variety of scenarios like those described above. I call these configurations "cashcow models" below, and they're currently the primary way of interfacing with cashcow.

My approach definitely comes with some downsides, the most obvious being that programming languages can be intimidating or counter-intuitive for newcomers. I'm really interested to learn more about whether this will translate into a major usability problem, or whether the flexibility that this approach accomodates can push users over the learning curve.

## Anatomy of a cashcow model

An example cashcow model looks like this:

```
Account(name='bank', balance=1000)

Contributor.Recurring(
    name='salary.job',
    account='bank',
    amount=5000,
    cadence='monthly',
)

Detractor.Recurring(
    name='rent',
    account='bank',
    amount=1500,
    cadence='monthly'
)
```

This model establishes one account, along with one inflow (salary, which *contributes* to the account) and one outflow (rent, which *detracts* from the account). Overall, this is describing a financial situation where you start with $1,000 in your account, make $5,000 per month, and pay $1,500 per month in rent. No interest, transfers between accounts, or other flows are in place.

Using cashcow, you can run a simulation of this model and get month-by-month projections for as far out as you'd like, though in this case these projections are relatively easy to arrive at -- the user is making $3,500 per month indefinitely. Using similar syntax, cashcow allows you to establish multiple accounts, funds flows between accounts, distinct interest rates on each account, asset tracking, and a handful of other features. It's also pretty easy to combine these to represent concepts like home mortgages.

The tools to interpret and run projections based on these models are still extremely simple, but there are some important properties of the language that make it useful from my point of view. Those include:

1. The language is syntactically simple and easy to read. It should be easy for newcomers to interpret simple models.
2. The conceptual paradigm is simple and intuitive; it is based around two concepts -- accounts and flows of funds between those accounts. Everyone with a bank account is familiar with these ideas, so using this language shouldn't require financial expertise. This also means that the language itself can stay relatively simple, and that concepts like mortgages, student debt, health savings accounts, etc can be built from a set of core building blocks vs implemented directly.
3. The language is designed to be [declarative](https://en.wikipedia.org/wiki/Declarative_programming), which means we're describing what we want to happen, now how (technically) we want it to happen. This makes it relatively straightforward to support scenario-based analyses, including setting goals ("when will I have enough money to retire given this model?") and what-if's (comparing outcomes of one model vs another). Both of these require little financial expertise, just an awareness of how you're spending or considering spending your money. 
    * Its also possible to recommend new flows to optimize outcomes, i.e. create a new investment account and start investing asap to maximize progress towards your goal, though this is low priority at the moment.

If we can successfully tackle all three goals, I think we'll have a useful tool for tackling the problem.

## A more advanced examples

Here's we're describing a more realistic model with a savings account and an investment account. We've got salaries regularly added to the savings account, and monthly transfers to the investment account. Both accounts have interest rates, which vary by account, and we've got a few inflows and outflows established for each account.

```
Account(name='bank', balance=2000)
Account(name='index_fund', balance=0)

Contributor.Recurring(
    name='salary.job', 
    account='bank',
    end_date='2021/06',
    amount=5000, 
    cadence='monthly',
)

Contributor.Interest(
    name='bank.interest',
    account='bank',
    rate=0.012
)

Detractor.Recurring(
    name='credit_card',
    account='bank',
    amount=3200
)

Library.RecurringTransfer(
    from_acct='bank',
    to_acct='index_fund',
    amount=500
)

Contributor.Interest(
    name='index_fund:interest',
    account='index_fund',
    rate=0.051,
)
```

Simulating this model over a 52-month period produces the following results for a basic simulation:

```
Projection period: 2020/09 - 2024/12 (52 months)

SUMMARY
Net worth on 2024/12: $100,487.74
Growth multiplier:    26.43


PROGRESSION
              2020/09          2021/07          2022/05          2023/04          2024/02          2024/12
Liquid / cash $3,802.00        $22,012.20       $40,575.66       $61,416.50       $80,757.85       $100,487.74
Non-liquid    --               --               --               --               --               --

PROGRESSION BY ACCOUNT
              2020/09          2021/07          2022/05          2023/04          2024/02          2024/12
bank          $3,302.00        $16,393.82       $29,617.16       $44,316.29       $57,820.10       $71,459.57
index_fund    $500.00          $5,618.38        $10,958.50       $17,100.21       $22,937.75       $29,028.17
```

It's straightforward to modify individual variables and re-run various simulations to compare the associated trade-offs, though there are plenty of improvements to be made to tooling to make this more convenient.

### More on the funds flow paradigm

One of the more important parts of this project so far is the choice of mental models that users should have when using this language; in particular, I want this to be accessible for financial novices like myself but also provide a lot of descriptive power for a wide range of financial applications (loans, changes in salary, etc).

The 'funds flows paradigm' as I call it in the documentation seems relatively powerful, and is anchored on two concepts:

* **Accounts** hold funds and are the subject of the simulation. Accounts can be liquid (bank accounts, investment accounts) or non-liquid (homes), and both can contribute to your net worth. A home that you own, for example, can be modeled as an account that may increase or decrease in value over time just like a bank account.

* **Flows** determine how the value of accounts changes over time. Flows can flow from accounts into other accounts, or from sources outside of the scope of the simulation (your employer, your credit card company, etc).

You can think of this model as being represented by a series of containers (accounts) with pipes between them (flows) that govern how their contents move from place to place. Many financial operations can be represented as a series of accounts and flows. Buying a house, for example, could be represented through the following operations:

* The home itself is represented as an account, which may have a flow associated with it to project how the value of the house will change over time.
* A mortgage can be represented as another account with a negative balance.
* The down payment of the house is subtracted from the funding account (i.e. a bank account), and a recurring payment is set up to fund the mortgage account from the funding account until the mortgage account is fully paid off.

### More on the declarative approach

Declarative languages are really great for this type of problem (simulating what-if's) because they specifically target the 'what' vs the 'how.' This provides a ton of room for the system itself to determine how to solve the problem, and give the system lots of flexibility to do what it needs to do. The go-to example for declarative languages is SQL, which clearly establishes the result the user is looking for without worrying about the details of how the results will be retrieved (the database determines 'how' based on the query).

One of the biggest benefits of a declaritive style for this application is that it's possible to constrain the simulation using very similar building blocks as what we've defined above. For example, you can establish goals using the same accounts & flows paradigm. For example:

```
Account(name='bank', balance=1000000)
```

This represents an account named 'bank' that has a million dollars in it. If we interpret this as a goal (I want my bank account to have a million dollars in it), we can use an existing model to determine how long it'll take to get there. This allows the complexity of the language itself to remain low, and to use the relatively simple concepts to deifne a variety of different scenarios, including things like financial goals.

## Future updates

Cashcow and the modeling language are still a work in progress; [the repo](https://github.com/anyweez/cashcow) is currently private, but may be something I make public in the future.

Once I've stabilized the initial version, my goal is to provide access to some other users and begin getting their feedback. Most importantly I want to verify whether others find it useful to use a slimmed-down code-like interface useful for this sort of task, and then I need to figure out whether my particular approach is appropriate. 

There are a handful of other applications at work that I'd like to try to model using cashcow, including both P&L business metrics as well as things like capacity planning for our engineering resources (using engineering points instead of dollars). Lots to work through before I can confidently determine whether either will be an appropriate use case without watering down the true purpose, but there's only one way to find out.