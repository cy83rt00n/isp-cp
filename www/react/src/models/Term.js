export default class Term {

    constructor(props) {
        this.id = props.id || 0;
        this.slug = props.slug || 'root';
        this.title = props.title || '';
        this.parentId = props.parentId || 0;
    }
}