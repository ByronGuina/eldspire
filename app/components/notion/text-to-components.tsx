import { Link } from 'remix'
import { getStyles } from './build-styles'
import { NotionBlock } from './types'

export function textToComponents(block: NotionBlock) {
    const children = block[block.type]?.rich_text.map((b, i) => {
        const styles = getStyles(b.annotations)

        if (b.href) {
            // If there's no text that means the page is an internal mention
            if (!b.text)
                return (
                    <Link
                        to={`/wiki/${b.href.split('https://www.notion.so/')[1]}`}
                        className={`${styles} mesmer-focus underline opacity-75`}
                        key={`${b.plain_text}-${i}`}
                    >
                        {b.plain_text}
                    </Link>
                )

            return (
                <a
                    href={b.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`${styles} mesmer-focus`}
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
