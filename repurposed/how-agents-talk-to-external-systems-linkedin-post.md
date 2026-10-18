# LinkedIn feed post: How AI Agents Talk to External Systems

Source: content/blog/how-agents-talk-to-external-systems.mdx
Link (live only after the post is deployed): https://basilinjoe.github.io/blog/how-agents-talk-to-external-systems

## Post (about 2,100 characters)

Your AI agent has never made an API call.

Not one.

It writes text in a particular shape. Then a program you wrote reads that text and decides what to do.

Once that clicked for me, the "MCP vs function calling vs A2A" debate looked different. They aren't competitors. They're six answers to one question:

What sits on the other side of the agent's request, and who decides its shape?

Here's how I choose:

1. Function calling
A few private tools, used on most requests. You own the schema. The simplest thing that works.

2. MCP
The integration has to work across many apps. The server author owns the interface. Please don't map every endpoint to a tool.

3. Code execution
Loops, filtering, big intermediate results. The agent writes a script and the data stays in a sandbox. Anthropic cut one workflow from 150,000 tokens to 2,000 this way.

4. Browser and computer use
Only when there is no API. Claude Sonnet 4.5 scored 61.4% on OSWorld, against 72.36% for humans. It's getting good, which is exactly why it's tempting to overuse. The screen is untrusted input.

5. Agent-to-agent (A2A)
When the other side reasons for itself. My test: if you'd describe it as "a set of operations," use MCP. If you'd describe it as "a colleague," use A2A.

6. Events
Webhooks, queues, long-running tasks. The only pattern where the outside world calls first. The hard part isn't the agent. It's idempotency.

Two things I'd tell any team building agents:

→ Past about 10 tools, the tool definitions become the cost. Anthropic's docs say tool selection degrades past 30 to 50 tools. Tool search and code execution exist to fix that.

→ Each pattern sets your blast radius. Ask: if the model believed the worst text it could read, what's the most it could do through this lane? Size permissions to that answer, not prompts.

Real systems layer these. An event wakes the agent, the agent calls MCP servers through code, and it hands a subtask to another agent.

I wrote up the full decision guide, including the 2026 MCP spec changes most write-ups haven't caught up with yet. Link in the first comment.

Which of these six is your team running in production, and which one surprised you?

#AIAgents #MCP #SoftwareEngineering

## First comment (post immediately after publishing)

Full guide with diagrams, a decision table, and every source linked: https://basilinjoe.github.io/blog/how-agents-talk-to-external-systems

## Alternative hooks (swap in for the first three lines)

A) "MCP or function calling?" is the wrong question. There are six ways an agent reaches the outside world, and most production systems need three of them.

B) Anthropic cut one agent workflow from 150,000 tokens to 2,000. They didn't change the model. They changed how the agent talks to its tools.

## Posting notes

- Attach the six-lanes diagram from the post as an image. A visual keeps people on the post longer, which helps reach.
- Keep the link out of the post body and put it in the first comment. Treat this as a test, not a law: LinkedIn has never confirmed a link penalty, but posts without outbound links are widely reported to travel further.
- Reply to comments within the first hour or two. Early conversation is what pushes a post beyond your direct network.
- Post on a weekday morning in your audience's main timezone. Without your own analytics, treat this as a hypothesis and compare against your past posts.
- Don't edit the post heavily in the first hour, and don't tag people who aren't actually mentioned.

## Fact check (every number above traces to the source post)

- 150,000 to 2,000 tokens: Anthropic, "Code execution with MCP" (2025-11-04)
- 61.4% (Sonnet 4.5) and 72.36% (human): Anthropic Sonnet 4.5 announcement; OSWorld project page
- Selection degrades past 30 to 50 tools, tool search recommended at 10 or more: Anthropic tool search docs
