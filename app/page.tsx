import { Block } from './components/notion/block'
import { DB } from './lib'

export default async function HomePage() {
    const frontPageBlocks = await DB.getFrontPage()

    return (
        <div>
            {frontPageBlocks.map(b => (
                // @ts-expect-error @TODO: Fix types
                <Block key={b.id} block={b} />
            ))}
        </div>
    )
}
