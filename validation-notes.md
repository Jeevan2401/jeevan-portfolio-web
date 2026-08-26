# Validation Notes

The fresh two-second BMW launch check showed the right-facing side-profile car and an increasing numerical counter during the intro. A follow-up live view showed the portfolio hero immediately after the configured two-second handoff.

The profile-card update retains this launch flow and changes only the header identity mark: the JG mark is now a continuously rotating control that opens the portrait card on click, touch, or keyboard activation. The portrait artwork is a centered upper crop whose visible bounds exclude the lower-right watermark from the supplied source image.

The desktop preview preserved the complete cinematic portfolio layout and the header identity control. The mobile preview preserved the BMW launch sequence and its visible sound/skip controls at a 375 px viewport; the rotating header trigger uses a touch-safe button and the portrait card width is constrained to the available viewport.

The card now retains its original portrait front while exposing a structured back face with frontend, Python, computer-vision, and shipping skill groupings. The same button supports pointer, touch, and keyboard activation; on desktop it also tracks pointer position for the holographic glare and slight surface tilt. Reduced-motion settings disable the continuous rotations, glare, and animated flip.

The visibility regression was caused by the flip wrapper remaining an inline span, so its absolutely positioned faces did not receive the fixed card-scene dimensions. The wrapper and both faces are now explicit block layers; this restores the immediate portrait, identity, role, and front-face details while leaving the flip and glare as optional interactive layers.

The technical-card back now reports language-specific experience conservatively: project-based Python, active JavaScript and HTML/CSS work, and SQL as a learning path. Sharing prefers the device-native share sheet and copies the profile URL when that capability is unavailable. Each voluntary face change triggers a short in-browser swoosh. When the profile card opens after the BMW launch, vertical overflow and touch panning are explicitly restored so scrolling remains available.
