import { fetchAllStops } from '../../server/db/supabase';
<template>
  <div>
    <div>
      <div class="flex flex-row justify-evenly items-center my-4">
        <button class="btn btn-outline" @click="dateBack">Back</button>
        <div class="border py-2 px-3 rounded-lg">{{ date }}</div>
        <button class="btn btn-outline" @click="dateForward">Forward</button>
      </div>
      <DriveStopList :date="date" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const date = ref(new Date().toISOString().substr(0, 10));
/**
 * Change the date either forward or backward by one day.
 * @param numberOfDays Number of days to change the date by. Defaults to 1 to increment forward by one day.
 */
function changeDate(delta: number = 1) {
  const newDate = new Date(date.value);
  newDate.setDate(newDate.getDate() + delta);
  date.value = newDate.toISOString().substr(0, 10);
}

function dateForward() {
  changeDate(1);
}

function dateBack() {
  changeDate(-1);
}
</script>
