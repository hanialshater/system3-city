---
name: operator-trial
description: Judge a human for a seat in an agent company (deploy approver, evaluation steward, author, budget holder) by a real trial task, with a referee and predictions committed first, a cost target with a stop rule, and a check by someone other than the candidate. Use when a company wants a human operator, or a human wants a seat.
---

# Operator trial

The city judges a human operator the way it judges an agent: by what they do on a real task, against a referee chosen
before the work. A CV is testimony; a trial is evidence.

1. **Pick the seat and its trial task.** The seat is one the principles keep human (P13): approving deploys, holding a
   budget, owning the referee and its held-out set, approving the org design, or the author's yes. The task is one the
   seat really does: approve or refuse prepared deploys, one of them seeded with a fault; decide a blind sample of edits;
   judge a run against its predictions; set a budget line and its stop rule.
2. **Write the referee first.** What a good outcome is, how it is measured, and who measures it. Keep the seeded faults or
   the held-out case outside every repository the candidate can read (the evaluation steward holds them).
3. **Predictions before the trial.** The candidate writes what they expect and what would show them wrong, and commits it
   (in the private intake) before they start.
4. **A cost target with a stop rule.** Set the hours; a trial over twice its target stops and is reviewed, never quietly
   extended.
5. **Run it in a sandbox.** No production access, no real users' data, no secrets. A trial is never unpaid production
   work.
6. **Check it independently.** Someone other than the candidate reads the result before the candidate's account
   (artifact before account), against the referee, and writes the verdict with its objections. Wrong predictions are
   reported as plainly as right ones.
7. **The founder decides** the seat, as with any change to the org (P13), in a decision record.

## Personal data

Names, e-mails, CVs, trial results and decisions about a person live only in the founder's private intake. Nothing about
a real candidate goes into a company's repository, the city or a published snapshot. A public example is a schema, or a
profile marked fictional.
