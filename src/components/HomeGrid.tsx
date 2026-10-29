import type { WorkspaceEntity } from '../types'
import { categoryIcon, categoryLabel } from '../lib/categories'
import MakCard from './MakCard'
import MakLogo from './MakLogo'

interface HomeGridProps {
  entities: WorkspaceEntity[]
  pinned: WorkspaceEntity[]
  grouped: Map<string, WorkspaceEntity[]>
  offline: boolean
  searching: boolean
  query: string
}

function greeting(): string {
  const h = new Date().getHours()
  if (h < 5) return 'Trabalhando até tarde?'
  if (h < 12) return 'Bom dia!'
  if (h < 18) return 'Boa tarde!'
  return 'Boa noite!'
}

export default function HomeGrid({
  entities,
  pinned,
  grouped,
  offline,
  searching,
  query,
}: HomeGridProps) {
  const activeCount = entities.filter(e => e.status === 'active').length
  const categoryCount = new Set(entities.map(e => e.category || 'other')).size
  const shown = pinned.length + [...grouped.values()].reduce((n, list) => n + list.length, 0)

  return (
    <div className="home">
      <header className="home-hero">
        <MakLogo size={84} />
        <div>
          <h1 className="home-title">{greeting()}</h1>
          <p className="home-sub">
            <b>{activeCount}</b> ativos · <b>{entities.length}</b> projetos ·{' '}
            <b>{categoryCount}</b> categorias
            {offline && <span className="home-offline"> · workspace.json inacessível</span>}
          </p>
        </div>
      </header>

      {searching && (
        <p className="home-filter">
          {shown === 0 ? 'Nenhum resultado para' : `${shown} resultado${shown === 1 ? '' : 's'} para`}{' '}
          “{query.trim()}” — incluindo arquivados
        </p>
      )}

      {pinned.length > 0 && (
        <section className="home-section">
          <div className="section-head">
            <span className="section-title">{'\u{1F4CC}'} fixados</span>
            <span className="section-count">{pinned.length}</span>
          </div>
          <div className="card-grid">
            {pinned.map(e => (
              <MakCard key={e.id} entity={e} />
            ))}
          </div>
        </section>
      )}

      {[...grouped.entries()].map(([cat, list]) => (
        <section key={cat} className="home-section">
          <div className="section-head">
            <span className="section-title">
              {categoryIcon(cat)} {categoryLabel(cat)}
            </span>
            <span className="section-count">{list.length}</span>
          </div>
          <div className="card-grid">
            {list.map(e => (
              <MakCard key={e.id} entity={e} />
            ))}
          </div>
        </section>
      ))}

      {shown === 0 && !searching && (
        <div className="home-empty">
          {offline
            ? 'Não foi possível carregar workspace.json — verifique o link public/workspace. Rode npm run dev novamente.'
            : 'Nada por aqui ainda.'}
        </div>
      )}
    </div>
  )
}

