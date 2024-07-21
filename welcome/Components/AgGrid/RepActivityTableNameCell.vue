<template>
    <div class="rep-act-tab-name-cell">
         <div class="name-circle">
            {{ initials }}
        </div>
        <div class="name-cell">
            {{ params.label }}
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            initials() {
                const names = this.params.label.split(' ');
                return names.map(name => name[0]).join('');
            }
        },
        mounted () {
            console.log("RepActivityTableNameCell :", this.params);
        }
    };
</script>

<style lang="scss" scoped>

    .rep-act-tab-name-cell {
        display: flex;
        align-items: center;

          .name-circle {
            width: 40px;
            height: 40px;
            padding: 0.3rem;
            border-radius: 50%;
            margin-right: 0.5rem;
            background-color: #eceefd;
            color: #6e77c2;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            font-weight: bold;
            border: solid 1px #cad0f8;
        }

        .name-cell {
            color: #3d4689;
            font-size: 10px;
        }
    }
</style>
