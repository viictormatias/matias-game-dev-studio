/** Shared emoji-style mark for Workspace, Chats and the voice controls. */
export default function MatiasLogo({ size = 64, tone = 'pink' }: { size?: number; animated?: boolean; tone?: 'pink' | 'black' }) {
  return <img className="matias-logo" src={tone === 'black' ? '/assets/matias-nose-chats.svg' : '/assets/matias-nose.svg'} width={size} height={size} alt="" aria-hidden="true" draggable={false} style={{ display: 'block', flexShrink: 0, objectFit: 'contain' }} />
}
