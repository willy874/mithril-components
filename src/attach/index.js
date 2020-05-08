import m from 'mithril'
import Sortable from 'sortablejs'
import classNames from 'classnames/bind'
import * as ICON from 'miix-icon'
import styles from './styles/attach.css'
import uuid from 'uuid'
const cx = classNames.bind(styles)

function getFileExtension(filename) {
    const ext = (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
    return ext ? ext[0] : undefined
}

function getIcon(ext) {
    const exts = ['doc', 'docx', 'odp', 'ods', 'odt', 'pdf', 'ppt', 'pptx', 'rar', 'xls', 'xlsx', 'zip']
    if (exts.indexOf(ext.toLowerCase()) > -1) {
        return m('i', m(ICON.FileType, {
            theme: ext
        }))
    }
    return m('i', m(ICON.FileOther))
}

function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function fileSelectHandler(files, storage) {

    for (let i = 0; i < files.length; i++) {
        if (files[i].size > this.size) {
            alert(`您的檔案[ ${files[i].name} ]超過${this.size / 1000000}MB,無法上傳.`)
            return
        }
        if (this.extension) {
            const pattern = this.extension;
            if (!pattern.test(files[i].name)) {
                alert('檔案類型不符合,無法上傳')
                return
            }
        }

        const found = this.attachs.find(item => {
            return item.filename == files[i].name
        })
        if (!found) {
            this.attachs.push({
                id: uuid(),
                filename: files[i].name,
                size: files[i].size,
                caption: files[i].name.split('.').slice(0, -1).join('.'),
                mimetype: files[i].type,
                dateOfUpload: new Date(),
                file: files[i],
                path: storage + files[i].name
            })
            this.export(this.attachs)
        }
    }
}

function initSortable() {
    this.sortable = Sortable.create(this.content, {
        ghostClass: `${cx('blue-background-class')}`,
        onChoose: (evt) => {
            const items = document.querySelectorAll(`.${cx('gi-editor-attach-item')}`);
            if (items) {
                items.forEach(item => {
                    item.classList.add(`${cx('editing')}`)
                })
            }
        },
        onEnd: (evt) => {
            this.attachs.splice(evt.newIndex, 0, this.attachs.splice(evt.oldIndex, 1)[0]);
            const items = document.querySelectorAll(`.${cx('gi-editor-attach-item')}`);
            if (items) {
                items.forEach(item => {
                    item.classList.remove(`${cx('editing')}`)
                })
            }
            this.export(this.attachs)
        }
    })
}

export default class Attachs {
    constructor(vnode) {
        this.attachs = vnode.attrs.files || []
        this.size = vnode.attrs.size || 50000000
        this.accept = vnode.attrs.accept || "image/*,.pdf,.odt,.odp,.ods,.zip"
        this.extension = vnode.attrs.extension || /(\.pdf)|(\.odt)|(\.odp)|(\.ods)|(\.zip)|(\.jpg)|(\.jpeg)|(\.png)/i
        this.export = vnode.attrs.export || function () {}
    }
    oncreate(vnode) {
        document.addEventListener('click', (e) => {
            const editing = vnode.dom.querySelector(`.${cx('gi-editor-attach-title')}[data-edit]`)
            if (editing && e.target != editing && !editing.contains(e.target)) {
                let isEditing = false
                this.attachs.map(item => {
                    if (item.caption == '') {
                        alert('檔案標題不可空白')
                        isEditing = true
                        item.editable = true
                    } else {
                        isEditing = isEditing ? true : false
                        item.editable = false
                    }
                })

                if (!isEditing) {
                    initSortable.call(this)
                    this.export(this.attachs)
                    m.redraw()
                }
            }
        })

        this.content = vnode.dom.querySelector(`.${cx('gi-editor-attachs-content')}`)
        initSortable.call(this)
    }
    onremove(vnode) {
        if (this.sortable) {
            this.sortable.destroy()
        }
    }
    view(vnode) {
        let {
            storage,
            files,
            note
        } = vnode.attrs

        files = files || []

        if (this.attachs.length == 0) {
            this.attachs = files
        }
        storage = storage || '.'

        return m('div.gi-attachs', {
            class: cx('gi-editor-attachs')
        }, [
            m('div.gi-attachs-header', {
                class: cx('gi-editor-header')
            }, [
                m('h6', [
                    '附件檔案',
                    note
                ]),
                m('button[type="button"]', {
                    class: cx('gi-editor-attach-upload'),
                    onclick: (e) => {
                        vnode.dom.querySelector('#attach_upload').click()
                    }
                }, '選擇檔案'),
                m('input#attach_upload[type="file"]', {
                    style: {
                        display: 'none'
                    },
                    multiple: true,
                    accept: this.accept,
                    onchange: (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        fileSelectHandler.call(this, e.target.files, storage)
                    }
                })
            ]),
            m('div.gi-attachs-content', {
                class: cx('gi-editor-attachs-content'),
                ondragover: (e) => {
                    e.preventDefault()
                },
                ondrop: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    fileSelectHandler.call(this, e.dataTransfer.files, storage)
                }
            }, [
                this.attachs.map((item, index) => {
                    const ext = getFileExtension(item.filename)
                    return m('div.gi-attachs-item', {
                        key: item.id,
                        class: cx('gi-editor-attach-item', {
                            'editing': item.editable
                        }),
                        style: {
                            'align-self': 'flex-start'
                        },
                        draggable: (!item.editable) ? true : false,
                        ondragstart: (e) => {
                            e.dataTransfer.setData("text/html", `<a href="${storage}/${item.filename}" title="檔案下載，檔案為${item.filename}，另開新視窗" download="${item.filename}">${item.caption}</a>`);
                        }
                    }, [
                        m('div', {
                            class: cx('gi-editor-attach-filename')
                        }, [
                            m('div', {
                                class: cx('gi-editor-attach-tooltip')
                            }, `檔案: ${item.filename}`)
                        ]),
                        m('div', {
                            class: cx('gi-editor-attach-icon')
                        }, getIcon(ext)),
                        (item.editable) ? [
                            m('div', {
                                class: cx('gi-editor-attach-title'),
                                'data-edit': item.editable
                            }, [
                                m('input[type="text"]', {
                                    oninput: (e) => {
                                        item.caption = e.target.value
                                    },
                                    onkeyup: (e) => {
                                        if (e.keyCode == 13) {
                                            e.preventDefault()
                                            if (item.caption == '') {
                                                alert('檔案標題不可空白')
                                                return false
                                            }
                                            item.editable = false
                                            initSortable.call(this)
                                            this.export(this.attachs)
                                        }
                                    },

                                    value: item.caption
                                })
                            ])
                        ] : [
                            m('div', {
                                class: cx('gi-editor-attach-title'),
                                ondblclick: (e) => {
                                    this.attachs.map(item => {
                                        item.editable = false
                                    })
                                    item.editable = true
                                    this.temp = item.caption
                                    this.sortable.destroy()
                                }
                            }, item.caption)
                        ],
                        m('div', {
                            class: cx('gi-editor-attach-size')
                        }, bytesToSize(item.size)),
                        m('button[type="button"]', {
                            class: cx('close'),
                            onclick: (e) => {
                                e.preventDefault()
                                this.attachs.splice(index, 1)
                                this.export(this.attachs)
                            }
                        }, m.trust('&times;'))
                    ])
                })
            ])
        ])
    }
}