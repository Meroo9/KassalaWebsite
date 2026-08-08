# Plan 001: Add Homepage Quick Services Section

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat ff60db6..HEAD -- src/app/page.js src/app/page.module.css`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: direction
- **Planned at**: commit `ff60db6`, 2026-07-18

## Why this matters

Al-Neelain University's website structure places primary emphasis on quick portal links (Moodle, Student Portal, Registration) directly on the homepage, allowing users to jump straight into student and faculty tools. Adding a responsive "Quick Services" section under the hero slider on Kassala University's home page will modernize the user experience, driving higher engagement for online registration and e-learning platforms.

## Current state

- Relevant files:
  - `src/app/page.js` — home page markup and state (lines 188–210)
  - `src/app/page.module.css` — styling rules for home page elements
  - `src/services/contentService.js` — provides service items data (`contentService.getServices()`)

- Code conventions:
  - Use `Tajawal` font-family variables.
  - Utilize Google Material Symbols (`material-symbols-outlined`) for icons.
  - Follow the existing Green & White theme color variables (`var(--primary)`, `var(--glass-bg)`, `var(--border-color)`).

## Commands you will need

| Purpose   | Command          | Expected on success |
|-----------|------------------|---------------------|
| Build     | `npm run build`  | exit 0, no errors   |
| Dev       | `npm run dev`    | server starts on 3000|

## Scope

**In scope**:
- `src/app/page.js`
- `src/app/page.module.css`

**Out of scope**:
- Changing existing route structures or modifying the administrative CMS pages.

## Git workflow

- Branch: `advisor/001-homepage-quick-services`
- Commit per logical step; message style matches conventional commits.

## Steps

### Step 1: Add Quick Services Section to the Homepage Markup
Insert the new quick services section in `src/app/page.js` right between the Hero Slider and the Welcome Section (Rector Word).

1. Edit [src/app/page.js](file:///d:/KassalaWebsite/src/app/page.js).
2. Retrieve portal items dynamically using `contentService.getServices()` inside `useEffect`.
3. Add the quick services grid layout mapping over these portal items:
```javascript
{/* Quick Portals Grid Section */}
<section className={styles.quickServicesSection}>
  <div className="container">
    <div className={styles.quickServicesGrid}>
      {services.slice(0, 4).map((service) => (
        <a key={service.id} href={service.link} target="_blank" rel="noopener noreferrer" className={styles.portalCard}>
          <div className={styles.portalIconWrapper}>
            <span className="material-symbols-outlined">{service.icon || 'star'}</span>
          </div>
          <h3>{locale === 'ar' ? service.arTitle : service.enTitle}</h3>
          <p>{locale === 'ar' ? service.arDesc : service.enDesc}</p>
        </a>
      ))}
    </div>
  </div>
</section>
```

**Verify**: Run `npm run build` to verify Next.js compiles without errors.

### Step 2: Define Quick Services Tones and Styles
Add the CSS module selectors in `src/app/page.module.css`.

1. Edit [src/app/page.module.css](file:///d:/KassalaWebsite/src/app/page.module.css).
2. Append styles for `.quickServicesSection`, `.quickServicesGrid`, `.portalCard`, and `.portalIconWrapper`:
   - Use `var(--glass-bg)` (green-to-white gradient) for `.portalCard`.
   - Contrast headings (`h3`) with `var(--primary)` green.
   - Add hover transition translations and outline/border glows.

```css
.quickServicesSection {
  padding: 40px 0;
  background: var(--background);
}
.quickServicesGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
.portalCard {
  background: var(--glass-bg);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  transition: var(--transition);
}
.portalCard:hover {
  transform: translateY(-5px);
  border-color: var(--primary);
  box-shadow: var(--box-shadow-hover);
}
.portalIconWrapper {
  color: var(--primary);
  margin-bottom: 12px;
}
```

**Verify**: Run `npm run build` and ensure compilation is successful.

## Test plan

- Verify responsive grid sizing on standard desktop and mobile widths.
- Ensure that clicking on quick portals successfully redirects in a new tab.

## Done criteria

- [ ] `npm run build` exits 0
- [ ] No files outside `page.js` and `page.module.css` are modified
- [ ] `plans/README.md` status updated to DONE

## STOP conditions

- If `contentService.getServices()` structure is altered or throws missing reference errors.
- If Next.js static site generation fails for the home route.

## Maintenance notes

- Future additions of electronic services in the admin dashboard will automatically flow into the home page bento block.
