# Niches

One template for any course or coaching business. The screens and data model don't change per niche;
the words, icons and sample copy do.

| Niche | Download is called | Example clients |
|---|---|---|
| `cooking` (demo) | Grocery list / Lista del súper | Cooking classes, nutrition coaches, meal-prep programs |
| `fitness` | Workout plan | Personal trainers, yoga, dance, running coaches |
| `tutoring` | Worksheet | Tutors, test prep, language teachers, homeschool programs |
| `music` | Sheet music | Music teachers, choir and band programs |

## Switch niche

Set `NICHE_ID` in `src/constants/config.ts`, then update `BRAND`, `FAQ`, `TESTIMONIALS` and the demo
content in `src/constants/demoData.ts` to match.

## Add a niche

1. Add an entry to `NICHES` in `src/constants/niches.ts` (subject, download name, icons, three benefits).
2. Add its id to the `NicheId` union and pick Ionicons that exist in `@expo/vector-icons`.
3. If it needs a different download type (e.g. audio), add the MIME type to `createUploadUrl` in
   `functions/src/index.ts` and to the `accept` list in `LessonEditorSheet.tsx`.
