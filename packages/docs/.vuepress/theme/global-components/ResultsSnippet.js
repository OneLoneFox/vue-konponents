import 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-javascript';

export default {
    functional: true,
    name: 'ResultsSnippet',
    props: {
        code: String,
        lang: String
    },
    render(h, ctx){
        const code = ctx.props.code;
        const lang = ctx.props.lang;
        const grammar = Prism.languages[ lang ];
        const className = `language-${lang}`;

        return h('div', {class: className},
        [
            h('pre', { class: className },
            [
                h('code', {
                    class: className,
                    domProps: {
                        innerHTML: Prism.highlight(code, grammar)
                    }
                })
            ])
        ]);
    },
}