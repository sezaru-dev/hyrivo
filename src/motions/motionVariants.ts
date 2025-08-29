import { Transition, Variants } from "framer-motion";
type FadeInParameters = {
  direction: 'left' | 'up' | 'right' | 'down',
  type: string,
  delay?: number,
  duration: number
}

type ZoomInParameters = {
  delay?: number,
  duration: number
  finalScale: number
}
type FadeParameter = {
  delay?: number,
  duration: number
}

export const staggerContainer = (staggerChildren:number, delayChildren:number) => ({
	hidden: {},
	show: {
		transition: {
			staggerChildren,
			delayChildren,
		},
	},
});


export const fadeIn = ({
  direction,
  type,
  delay,
  duration
}: FadeInParameters): Variants => {
  const transition: Transition = {
    type: type as Transition["type"], // ensures valid Framer Motion type
    duration,
    ease: "easeOut",
    ...(delay !== undefined && { delay }),
  };

  return {
    hidden: {
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition,
    },
  };
};

export const fadeInWithDelay = ({direction, type, delay, duration}:FadeInParameters) => ({
	hidden: {
		x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
		y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
		opacity: 0,
	},
	show: {
		x: 0,
		y: 0,
		opacity: 1,
		transition: {
			type,
			delay,
			duration,
			ease: 'easeIn',
		},
	},
});


export const zoomIn = ({ delay, duration, finalScale }: ZoomInParameters) => {
  const transition: any = {
    type: 'spring',
    duration,
    ease: 'easeOut',
    ...(delay !== undefined && { delay }), 
  };
  return{
    hidden: {
      scale: 0.6,
      opacity: 0,
    },
    show: {
      scale: finalScale,
      opacity: 1,
      transition
    },
  }
} 

export const fade = ({duration, delay}:FadeParameter) => {
  const transition: any = {
    type: 'tween',
    duration,
    ease: 'easeIn',
    ...(delay !== undefined && { delay }), 
  };
  return {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition
    },
  }
};