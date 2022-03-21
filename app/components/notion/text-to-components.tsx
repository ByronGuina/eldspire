import { Link } from 'remix'
import { getStyles } from './build-styles'
import { NotionBlock } from './types'

export function textToComponents(block: NotionBlock) {
    const children = block[block.type]?.rich_text.map((b, i) => {
        const styles = getStyles(b.annotations)

        if (b.href) {
            if (b.type === 'mention') {
                return (
                    <Link
                        to={`/rewrite/${b.mention?.page.id}`}
                        className={`${styles} underline opacity-80 hover:opacity-60 transition-colors duration-150`}
                        key={`${b.plain_text}-${i}`}
                    >
                        {b.plain_text}
                    </Link>
                )
            }

            return (
                <a
                    href={b.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`${styles}`}
                    key={`${b.text.content}-${i}`}
                >
                    {b.text.content}
                </a>
            )
        }

        return (
            <span className={styles} key={`${b.text.content}-${i}`}>
                {b.text.content}
            </span>
        )
    })

    return children || null
}
