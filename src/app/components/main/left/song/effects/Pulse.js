import { keyframes } from '@mui/system';

export const pulse = (width, color) => {
  return (
    keyframes`
      0% {box-shadow: inset 0 0 0 ${width}px ${color};}
      50% {box-shadow: inset 0 0 0 ${width}px rgba(0, 0, 0, 0);}
      100% {box-shadow: inset 0 0 0 ${width}px ${color};}
    `
  )
}