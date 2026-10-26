---
name: book
title: Books
description: A book reader for a company that publishes books (a press, a blog with a book), from its books tool, a shelf, each public book's table of contents with drafts marked, and its chapters in a readable typeface and measure, light and dark, at phone width. A private book shows only its title, status and that it is private.
kind: template
reads: [books]
from: System 3 city
---

# Books

A shelf of the company's books, each public book's table of contents (parts as headings; drafts and protected chapters
marked), and a reader for its chapters: a book typeface, a measure of about 66 characters, three text sizes, previous
and next, in the HQ's light and dark themes, at phone width.

It reads only `ctx.books`, the books contract (product/STARTER.md §3), which a company's books tool prints (Meta's
`src/books.mjs <books.json>`, named as `booksCmd` in the company's city entry, published in its snapshot as
`books.json`). The page never reads a book's files.

- **A public book** carries its chapters: `{ n, id, file, title, kind, status: draft | protected | manuscript, words,
  body }`. The tool leaves out author comments (`<!-- … -->`) and turns images into their captions.
- **A private book** carries only `{ title, status, visibility: "private" }`: the tool never opens its checkout, so none
  of its text reaches the HQ, a snapshot or the city.

Use it: copy it into your company (`node src/city-copy.mjs page book <company dir>`, in system3-meta) and customise your
copy.
