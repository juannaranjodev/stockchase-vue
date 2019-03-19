<template>
  <table class="table top-worst-experts-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Period</th>
        <th>Big Lose</th>
        <th>Lose</th>
        <th>No Change</th>
        <th>Win</th>
        <th>Big Win</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="expert in experts"
        :key="expert.id + '-' + expert.index"
      >
        <td>
          <span v-if="expert.index == 0">{{ expert.id }}</span>
        </td>
        <td>
          <span v-if="expert.index == 0">{{ expert.name }}</span>
        </td>
        <td>
          <span>{{ expert.period }}</span>
        </td>
        <td>
          <span>{{ expert.bigLose }}</span>
        </td>
        <td>
          <span>{{ expert.lose }}</span>
        </td>
        <td>
          <span>{{ expert.noChange }}</span>
        </td>
        <td>
          <span>{{ expert.win }}</span>
        </td>
        <td>
          <span>{{ expert.bigWin }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'TopWorstExpertsTable',

  props: {
    experts: {
      type: Array,
      required: true,
    }
  }
}
</script>

<style lang="stylus" scoped>
.top-worst-experts-table
  .table
    .th,
    .td
      border-top: 0;

    .thead
      .th
        border-bottom: 0;
</style>
