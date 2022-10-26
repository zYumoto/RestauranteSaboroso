class HcodeGrid {

    constructor(configs) {

        configs.listeners = Object.assign({

            afterUpdateClick: e => {
                $('#modal-update').modal('show');
            },
            afterDeleteClick: (e) => {
                window.location.reload();

            },
            afterFormCreate: (e) => {
                window.location.reload();
            },
            afterFormUpdate: (e) => {
                window.location.reload();
            },
            afterFormCreateError: (e) => {
                alert('Nao foi possivel enviar o formulário');
            },
            afterFormUpdateError: (e) => {
                alert('Nao foi possivel enviar o formulário');

            }
        }, configs.listeners)

        this.configs = Object.assign({}, {
            formCreate: '#modal-create form',
            formUpdate: '#modal-update form',
            btnUpdate: 'btn-update',
            btnDelete: 'btn-delete',
            onUpdateLoad: (form, name, data) => {

                let input = form.querySelector('[name=' + name + ']');
                if (input) input.value = data[name];
            }
        }, configs);

        this.rows = [...document.querySelectorAll('table tbody tr')];

        this.initButtons();
        this.initForms();

    }

    fireEvent(name, args) {

        if (typeof this.configs.listeners[name] === 'function') this.configs.listeners[name].apply(this, args);
    }

    initForms() {

        // create    
        this.formCreate = document.querySelector(this.configs.formCreate);

        if (this.formCreate) {
            this.formCreate.save({
                success: () => {
                    this.fireEvent('afterFormCreate');

                },
                failure: () => {
                    this.fireEvent('afterFormCreateError');

                }
            });
        }


        // update
        this.formUpdate = document.querySelector(this.configs.formUpdate);

        if (this.formUpdate) {
            this.formUpdate.save({
                success: () => {
                    this.fireEvent('afterFormUpdate');

                },
                failure: () => {
                    this.fireEvent('afterFormUpdateError');

                }
            });
        }
    }


    btnUpdateClick(e) {

        this.fireEvent('beforeUpdateClick', [e])

        let tr = e.srcElement.parentElement.parentElement;

        let data = JSON.parse(tr.dataset.row);

        for (let name in data) {

            this.configs.onUpdateLoad(this.formUpdate, name, data);

        }

        setTimeout(() => {
            this.fireEvent('afterUpdateClick');
        }, 100);

    }

    btnDeleteClick(e) {

        this.fireEvent('beforeDeleteClick');

        let tr = e.srcElement.parentElement.parentElement;

        let data = JSON.parse(tr.dataset.row);

        if (confirm(eval('`' + this.configs.deleteMsg + '`'))) {

            fetch(eval('`' + this.configs.deleteUrl + '`'), {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(json => {

                    this.fireEvent('afterDeleteClick');
                });
        }
    }


    initButtons() {

        this.rows.forEach(row => {

            [...row.querySelectorAll('.btn')].forEach(btn => {

                btn.addEventListener('click', e => {

                    if (e.target.classList.contains(this.configs.btnUpdate)) {

                        this.btnUpdateClick(e);

                    } else if (e.target.classList.contains(this.configs.btnDelete)) {

                        this.btnDeleteClick(e);

                    } else {

                        let a = e.srcElement.parentElement.parentElement;
                        this.fireEvent('buttonClick', [e.target, JSON.parse(a.dataset.row), e])
                    }
                });
            });
        });
    }
}