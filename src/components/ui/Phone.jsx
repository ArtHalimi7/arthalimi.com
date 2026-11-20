import frame from '../../assets/phone-frame.webp';

/**
 * A phone: the screen content (`children`), clipped to the screen's rounded shape, under a photographic frame
 * (assets/phone-frame.webp: transparent screen and surroundings). The screen box sits a hair outside the frame's
 * opening so the bezel always covers its edge. Size and place it with `className`; `ref` reaches the outer element.
 */
export default function Phone({ ref, className = '', screenClassName = '', children }) {
  return (
    <div ref={ref} className={`phone-device ${className}`}>
      <div className={`phone-screen ${screenClassName}`}>{children}</div>
      <img src={frame} alt="" aria-hidden="true" draggable="false" decoding="async" className="phone-frame" />
    </div>
  );
}
