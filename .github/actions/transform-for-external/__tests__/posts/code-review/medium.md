---
  slug: 'code-review'
  title: 'Improve your code through code reviews'
  description: "What does the term code review mean? Where are code reviews used and what does it involve?"
  image: cover.jpg
  createdAt: 1651776171000
  location: 'posts/code-review.mdx'
  readTimeMins: 4
  coverAuthor: Alvaro Reyes
  coverAuthorUrl: https://unsplash.com/@alvarordesign
  author: Nevulo
  labels:
    - programming
    - code review
    - code quality
---
Getting a second opinion matters.
When you’re shipping new features to [production](https://www.pagerduty.com/resources/learn/what-is-production-environment/), it’s important that all the requirements get implemented and everything works properly under lots of different situations. Otherwise, users are going to have a poor experience.

I can personally say it’s too easy for one person to miss simple problems that lead to bugs. It’s helpful to have more sets of eyes looking at the solution and seeing if it’s optimal and what comments/suggestions could be applied to improve it for everyone.

Code reviews have helped a lot in my career to catch mistakes, typos or other major/minor bugs when writing code to be used by thousands.
But, what is a code review, why is it helpful, and how can we incorporate code reviews in a project?

## What is a code review?

A code review is where engineers in your team can inspect the code you’ve submitted to be shipped to production, and collaborate on comments and suggestions, before it goes live.

When you’re making any change to a codebase, typically you’ll publish those changes remotely to a repository, like on GitHub.

You can commit changes directly to the `main` branch, which represents the most up-to-date copy of the code, and usually, whatever is on the main branch eventually gets sent to production, meaning real users see that change.

Instead of committing directly to the main branch, we can create a new branch off the main branch and just push the changes relevant for one piece of work.

When your changes are ready to go to production, you’ll create a “[pull request](https://www.pagerduty.com/resources/learn/what-is-a-pull-request/)”, which is literally a _request_ to _pull_ your changes into the main branch.

In this request to introduce changes to the repository, others in the organisation get the chance to view the changes you’ve made, write comments on the changes, or provide suggestions for alternative solutions.

Reviewers can also:

- **Approve** a pull request, meaning the changes to the code look good and this is ready for production!
- **Request changes** on a pull request, meaning the changes to the code aren’t working as expected/correctly, and things need work
- **Comment without explicit approval**, meaning the reviewer hasn’t approved or denied the pull request but has left comments

![](https://raw.githubusercontent.com/Nevvulo/blog/main/posts/assets/code-review/github-review-changes.png)

## Why do code reviews?

### The more eyes, the better

Giving other engineers the ability to review your code gives them the opportunity to:

- spot potential problems or bugs before they ship to users
- suggest improvements on performance so features scale properly
- maintain project quality and makes sure everybody agrees the code is readable and acceptable
- test changes before they go live, catching issues early

No matter the _size_ of the change, developers in a code review should look to review the quality of the changes coming in and think about potential improvements.

### Code reviews help you and your team grow

Exposing yourself to code as much as possible is a surefire way to expand your vocabulary, identify anti-patterns, and ultimately help you and your team write better code.

Offloading the review process to other developers, who can offer _different perspectives_, helps teams remain agile and keep releasing new high-quality features quickly.

It’s also a great opportunity for _others to learn_ new techniques or get suggestions to [improve code quality over time](https://nevulo.xyz/blog/code-quality).

### Giving others opportunity to comment

Other engineers can comment on readability, syntax, and other aspects of the code to improve the quality. These might be small changes like flipping an `if` statement to improve the logic flow, or adding an early return.

Beyond reviewing just _code_ and its literal syntax, code reviews also offer the opportunity for others to voice feedback on other aspects of changes like styling or functionality if something doesn’t seem right.

![](https://raw.githubusercontent.com/Nevvulo/blog/main/posts/assets/code-review/comments.png)

## Best practices for code reviews

- **Develop guidelines and standards for reviews**
  [Atlassian](https://www.atlassian.com/blog/add-ons/code-review-best-practices) and [Google](https://google.github.io/eng-practices/review/reviewer/looking-for.html) have written about what reviewers actually look for in a code review; things like architecture, functionality, readability, security, and much more.

  Ask questions like:

  - Does this pull request do what it says it does?
  - Does it meet all the requirements laid out for this work?
  - Given this code change, how will this affect users?

- **Make sure changes are adequately tested**  
  For particularly complex changes, automated tests help assert that all the requirements are being met under certain conditions. It will provide more confidence to teammates being able to see that all tests are passing in the CI/CD pipeline. This is known as “test coverage”.

  To learn more, [read about how testing your software is just as important as writing it.](https://nevulo.xyz/blog/testing-software)

- **Keep changes short, simple and readable**
  [Cisco has reported](https://static1.smartbear.co/support/media/resources/cc/book/code-review-cisco-case-study.pdf) that performance is likely to drop in developers reviewing more than 300-400 lines of code, and it’s well documented that reviewing for long periods of time leads to worse performance.
