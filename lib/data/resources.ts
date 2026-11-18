import { images } from "@/lib/images";

export type Article = {
  id: string;
  category: string;
  readingTime: string;
  title: string;
  excerpt: string;
  image: string;
  body: string[];
};

export const articles: Article[] = [
  {
    id: "understanding-anxiety",
    category: "Anxiety",
    readingTime: "5 min read",
    title: "Understanding Anxiety",
    excerpt:
      "Anxiety is a normal human response. Here is how to recognise when it has moved beyond that, and what can help.",
    image: images.articles.anxiety,
    body: [
      "Anxiety is not an error in the system. It is the body preparing for something it has judged to be a threat — heart rate rises, attention narrows, muscles tense. In the right circumstances this is useful. The difficulty arises when the response fires often, stays on long after the situation has passed, or arrives with no identifiable trigger at all.",
      "The clinical question is rarely whether someone feels anxious. It is how much of their life is being organised around that feeling: journeys not taken, conversations avoided, opportunities quietly declined. When avoidance starts shaping decisions, anxiety has moved from an ordinary experience to something worth addressing.",
      "Several things genuinely help. Structured psychological approaches teach people to stay with discomfort long enough for it to subside rather than escaping it immediately. Sleep, movement and reducing stimulants are not minor adjustments — they change the baseline. Where symptoms are more severe, medication can lower the intensity enough for other work to become possible.",
      "If anxiety has been affecting your daily life for several weeks, a consultation is a reasonable next step. A psychiatrist can distinguish anxiety from other conditions that resemble it, including some physical ones, and help you decide what is actually worth trying.",
    ],
  },
  {
    id: "managing-everyday-stress",
    category: "Wellbeing",
    readingTime: "4 min read",
    title: "Managing Everyday Stress",
    excerpt:
      "Sustained pressure accumulates quietly. Small, consistent adjustments tend to outperform dramatic ones.",
    image: images.articles.stress,
    body: [
      "Stress is not inherently harmful. Short bursts of it sharpen focus and help people meet demands. What causes damage is the version with no recovery built in — the pressure that never fully releases between one deadline and the next.",
      "The early signals are easy to dismiss because they look like ordinary tiredness: shortened patience, disturbed sleep, difficulty concentrating, tension headaches, a sense of doing more while achieving less. Noticing these while they are still mild is far more effective than waiting for something to break.",
      "What tends to help is unglamorous and consistent. A defined end to the working day. Sleep and waking times that stay roughly fixed. Movement, even briefly. Genuine breaks that are not simply a different screen. And a realistic look at workload, because no amount of personal resilience compensates for a volume of work that is genuinely impossible.",
      "If stress has persisted for months, or you no longer recover on weekends or holidays, it is worth discussing with a professional before it becomes burnout — which takes considerably longer to recover from.",
    ],
  },
  {
    id: "understanding-depression",
    category: "Depression",
    readingTime: "6 min read",
    title: "Understanding Depression",
    excerpt:
      "Depression is more than sadness. Recognising the fuller pattern is often the first step towards treating it.",
    image: images.articles.depression,
    body: [
      "Depression is frequently described as sadness, which undersells it. Many people experiencing it report something closer to flatness — an absence of interest, pleasure or motivation rather than active unhappiness. Things that previously mattered simply stop registering.",
      "It affects the body as much as the mood. Sleep changes in either direction. Appetite shifts. Concentration becomes unreliable. Fatigue arrives without exertion. Because these symptoms overlap with several physical conditions, including thyroid problems and anaemia, a proper assessment is worth having rather than assuming.",
      "One of the cruellest features of depression is that it argues against its own treatment. It tells people they are being self-indulgent, that nothing will help, that others have it worse. These are symptoms producing thoughts, not accurate assessments of a situation — and recognising that distinction can itself be a turning point.",
      "Depression responds to treatment. Psychological therapy, medication, or both in combination all have substantial evidence behind them. Recovery is rarely linear, but the direction of travel over months is what matters, not any individual week.",
    ],
  },
  {
    id: "importance-of-sleep",
    category: "Sleep",
    readingTime: "4 min read",
    title: "The Importance of Sleep",
    excerpt:
      "Sleep and mental health influence each other in both directions. Treating one often improves the other.",
    image: images.articles.sleep,
    body: [
      "Sleep is not downtime. During it the brain consolidates memory, regulates emotion and clears metabolic by-products. Lose enough of it and the effects show up quickly: emotional reactivity increases, tolerance for frustration falls, and concentration becomes patchy.",
      "The relationship runs in both directions, which is what makes it clinically important. Poor sleep increases the likelihood of depression and anxiety; depression and anxiety disrupt sleep. Left alone, the two reinforce each other, and it stops mattering very much which came first.",
      "Most improvement comes from consistency rather than effort. A fixed waking time, including at weekends. Light exposure early in the day. Caffeine kept well away from the evening. A wind-down period without screens. And the counterintuitive one: leaving the bed if sleep has not come within twenty minutes, so the bed does not become associated with lying awake.",
      "If sleep difficulty has lasted more than a month despite these measures, it is worth assessing properly. Persistent insomnia is treatable, and addressing it frequently improves mood and energy at the same time.",
    ],
  },
  {
    id: "breaking-stigma",
    category: "Society",
    readingTime: "5 min read",
    title: "Breaking Mental Health Stigma",
    excerpt:
      "The delay between noticing a difficulty and seeking help is often measured in years. Stigma is a large part of why.",
    image: images.articles.stigma,
    body: [
      "People wait a remarkably long time before seeking help for mental health difficulties — frequently years. The reasons are rarely about access alone. They are about what seeking help is thought to signify: weakness, instability, something that might follow a person through their career or their family expectations.",
      "A large part of this rests on an assumption that mental illness is categorically different from physical illness. It is not. These are conditions with biological, psychological and social components, which respond to treatment in much the way other medical conditions do. Nobody is thought weak for treating asthma.",
      "Language carries more weight here than it seems to. Describing someone as being bipolar, rather than as having bipolar disorder, collapses a person into a diagnosis. Using clinical terms casually — obsessive, depressed, traumatised — to describe ordinary irritations makes the real conditions harder to speak about seriously.",
      "What reduces stigma, reliably, is ordinary contact and ordinary conversation. People who know someone being treated for a mental health condition hold markedly fewer stigmatising views. Which means that speaking about it where it is safe to do so is not only a personal relief — it changes the environment for the next person.",
    ],
  },
  {
    id: "when-to-consult",
    category: "Getting Started",
    readingTime: "4 min read",
    title: "When Should You Consult a Psychiatrist?",
    excerpt:
      "You do not need to be in crisis to justify an appointment. Here are some reasonable prompts.",
    image: images.articles.consult,
    body: [
      "A common belief is that psychiatric care is for emergencies and severe illness only, and that anything short of that should be managed privately. This is not how the specialty actually works, and it leads people to wait until a difficulty is much harder to treat.",
      "Some practical prompts. Symptoms persisting beyond two to four weeks without improvement. Difficulty functioning at work, in studies, or in relationships. Changes in sleep, appetite or concentration that you cannot explain. Relying on alcohol or other substances to cope. Feeling consistently unlike yourself. Or simply: people who know you well have said they are concerned.",
      "It helps to know what a psychiatrist is. A psychiatrist is a medical doctor with specialist training in mental health, able to assess physical causes, make diagnoses and prescribe. Psychologists and therapists provide psychological treatment but do not prescribe. The two often work together, and a psychiatrist can advise which you need.",
      "Any thought of suicide or self-harm warrants immediate attention rather than a scheduled appointment. In India, call 112, or go to the nearest emergency department. If you are unsure whether what you are experiencing warrants a consultation, that uncertainty is itself a reasonable reason to book one.",
    ],
  },
];
