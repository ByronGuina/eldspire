import { Block } from '~/components/notion/block'
import { DB } from '~/lib'

interface Props {
    params: { id: string }
}

export default async function WikiPage({ params }: Props) {
    // @TODO: Just do it by id
    const slug = await DB.pageIdToSlug(params.id)
    const page = await DB.getPageBySlug(slug)

    return (
        <div className="flex flex-col">
            <h1>{page.title}</h1>
            {page.blocks.map(b => (
                <Block key={b.id} block={b} />
            ))}
        </div>
    )
}
