import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

export default function Layers() {
  const main = useRef();
  const scrollTween = useRef();
  const snapTriggers = useRef([]);
  const { contextSafe } = useGSAP(
    () => {
      const panels = gsap.utils.toArray('.panel');
      let scrollStarts = [0];
      let snapScroll = (value) => value;

      panels.forEach((panel, i) => {
        snapTriggers.current[i] = ScrollTrigger.create({
          trigger: panel,
          start: 'top top',
        });
      });

      ScrollTrigger.addEventListener('refresh', () => {
        scrollStarts = snapTriggers.current.map((trigger) => trigger.start);
        snapScroll = ScrollTrigger.snapDirectional(scrollStarts);
      });

      ScrollTrigger.observe({
        type: 'wheel,touch',
        onChangeY(self) {
          if (!scrollTween.current) {
            const scroll = snapScroll(
              self.scrollY() + self.deltaY,
              self.deltaY > 0 ? 1 : -1
            );
            goToSection(scrollStarts.indexOf(scroll));
          }
        },
      });

      ScrollTrigger.refresh();
    },
    { scope: main, revertOnUpdate: true }
  );

  const goToSection = contextSafe((i) => {
    scrollTween.current = gsap.to(window, {
      scrollTo: { y: snapTriggers.current[i].start, autoKill: false },
      duration: 1,
      onComplete: () => (scrollTween.current = null),
      overwrite: true,
    });
  });

  return (
    <main ref={main}>
      <section className="description panel gradient-green">
        <div>
          <h1>Layered pinning</h1>
          <p>Use pinning to layer panels on top of each other as you scroll.</p>
          <div className="scroll-down">
            Scroll down<div className="arrow"></div>
          </div>
        </div>
      </section>
      <section className="panel gradient-blue">ONE</section>
      <section className="panel gradient-orange">TWO</section>
      <section className="panel gradient-purple">THREE</section>
      <section className="panel gradient-red">FOUR</section>
    </main>
  );
}
