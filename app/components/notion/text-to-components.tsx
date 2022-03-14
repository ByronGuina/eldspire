import { getStyles } from './build-styles'
import { NotionBlock } from './types'

export function textToComponents(block: NotionBlock) {
    const children = block[block.type]?.text.map((b, i) => {
        const styles = getStyles(b.annotations)

        // TODO: Return a Link if the block is a link to another Notion page
        if (b.href) {
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
