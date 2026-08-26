# Validation Notes

The fresh two-second BMW launch check showed the right-facing side-profile car and an increasing numerical counter during the intro. A follow-up live view showed the portfolio hero immediately after the configured two-second handoff.

The profile-card update retains this launch flow and changes only the header identity mark: the JG mark is now a continuously rotating control that opens the portrait card on click, touch, or keyboard activation. The portrait artwork is a centered upper crop whose visible bounds exclude the lower-right watermark from the supplied source image.

The desktop preview preserved the complete cinematic portfolio layout and the header identity control. The mobile preview preserved the BMW launch sequence and its visible sound/skip controls at a 375 px viewport; the rotating header trigger uses a touch-safe button and the portrait card width is constrained to the available viewport.

The card now retains its original portrait front while exposing a structured back face with frontend, Python, computer-vision, and shipping skill groupings. The same button supports pointer, touch, and keyboard activation; on desktop it also tracks pointer position for the holographic glare and slight surface tilt. Reduced-motion settings disable the continuous rotations, glare, and animated flip.

The visibility regression was caused by the flip wrapper remaining an inline span, so its absolutely positioned faces did not receive the fixed card-scene dimensions. The wrapper and both faces are now explicit block layers; this restores the immediate portrait, identity, role, and front-face details while leaving the flip and glare as optional interactive layers.

The technical-card back now reports language-specific experience conservatively: project-based Python, active JavaScript and HTML/CSS work, and SQL as a learning path. Sharing prefers the device-native share sheet and copies the profile URL when that capability is unavailable. Each voluntary face change triggers a short in-browser swoosh. When the profile card opens after the BMW launch, vertical overflow and touch panning are explicitly restored so scrolling remains available.

The profile card no longer responds to pointer movement with holographic glare or physical tilt. Its surface remains still until deliberately activated for the card flip, while the existing share action, optional audio cue, touch-safe scrolling, and reduced-motion behavior are unchanged.

The profile card now has a stable, low-intensity red border glow for separation from the cinematic dark background. Scrolling no longer depends on the card state: the post-intro page root and body are reset to normal vertical overflow and touch behavior immediately, on the next animation frame, and after the final BMW cleanup window so stale launch styles cannot reapply a scroll lock.

Full-site QA was performed through a repeatable Chromium audit at desktop and touch-sized mobile viewports. It exercised the BMW sound/skip controls; restored scroll behavior; profile-card open, flip, share, close, and image load; all three menu destinations; both hero actions; required-field validation; mocked form-success presentation; WhatsApp, résumé, GitHub, email, and LinkedIn destinations; and mobile profile-card scrolling. The audit found and corrected a mobile BMW-exit scroll-lock path. The full-screen menu destinations were also converted to native buttons, so keyboard Enter activation now works. The only console error observed during automation was caused by the test deliberately aborting the BMW asset to hold the intro controls; live logs showed no functional browser or network failures.
