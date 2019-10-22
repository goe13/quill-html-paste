import Quill from 'quill';
import Delta from 'quill-delta';

const Clipboard = Quill.import('modules/clipboard');

export default class HTMLClipboard extends Clipboard {
    onPaste(e) {
        if (e.defaultPrevented || !this.quill.isEnabled()) return;
        let range = this.quill.getSelection();
        let delta = new Delta().retain(range.index);
        let scrollTop = this.quill.scrollingContainer.scrollTop;
        this.container.focus();
        this.quill.selection.update(Quill.sources.SILENT);
        setTimeout(() => {
          delta = delta.concat(this.convert()).delete(range.length);
          this.quill.updateContents(delta, Quill.sources.USER);
          // range.length contributes to delta.length()
          this.quill.setSelection(delta.length() - range.length, Quill.sources.SILENT);
          this.quill.scrollingContainer.scrollTop = scrollTop;
          this.quill.focus();
        }, 1);
      }
}