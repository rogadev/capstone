<template>
  <div class="w-full">
    <table class="hidden md:block w-full border-collapse rounded table-auto">
      <thead>
        <tr>
          <th class="border px-4 py-2">Date</th>
          <th class="border px-4 py-2">Time</th>
          <th class="border px-4 py-2">Name</th>
          <th class="border px-4 py-2">Origin</th>
          <th class="border px-4 py-2">Destination</th>
          <th class="border px-4 py-2">Distance</th>
          <th class="border px-4 py-2">Duration</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="trip in sortedTrips" :key="trip.id">
          <td class="border px-4 py-2">{{ trip.date }}</td>
          <td class="border px-4 py-2">{{ trip.pickupTime }}</td>
          <td class="border px-4 py-2">{{ trip.passengerName }}</td>
          <td class="border px-4 py-2">{{ trip.pickupAddressCity }}</td>
          <td class="border px-4 py-2">{{ trip.dropOffAddressCity }}</td>
          <td class="border px-4 py-2">{{ trip.estimatedDistance }} km</td>
          <td class="border px-4 py-2">{{ trip.estimatedDuration }} min</td>
        </tr>
      </tbody>
    </table>
    <div class="flex md:hidden flex-col items-center gap-2 border rounded-lg p-4">
      <div v-for="trip in sortedTrips" :key="trip.id" class="w-full border-b pb-2">
        <div class="flex flex-row justify-between items-center">
          <div>
            <div class="flex justify-between items-center">
              <p>
                {{ trip.pickupTime }} - {{ formatDate(trip.date) }}
              </p>
            </div>
            <p>
              {{ trip.passengerName }}
            </p>
          </div>
          <div class="flex flex-col justify-end">
            <div class="flex flex-row-reverse gap-2 items-center">
              <span>
                {{ trip.dropOffAddressCity }}
              </span>
              <Icon name="fa6-solid:arrow-right" />
              <span>
                {{ trip.pickupAddressCity }}
              </span>
            </div>
            <div class="flex flex-row justify-end items-center gap-2">
              <Icon name="fa6-solid:route" />
              <p class="text-right pr-4">
                {{ trip.estimatedDistance }} km
              </p>
              <Icon name="fa6-solid:clock" />
              <p class="text-right">
                {{ trip.estimatedDuration }} min
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Trip } from '.prisma/client';

const props = defineProps({
  trips: {
    type: Array as PropType<Trip[]>,
    required: true,
  }
});

const sortedTrips = computed(() => props.trips.sort((a, b) => {
  if (a.date === b.date) {
    return a.pickupTime.localeCompare(b.pickupTime);
  }
  return a.date.localeCompare(b.date);
}));

function formatDate(dateString: string) {
  dateString = dateString.replace(/-/g, '/');
  const date = new Date(dateString);
  const today = new Date();
  if (date === today) {
    return 'TODAY';
  }
  return Intl.DateTimeFormat('en-us', {
    month: 'long',
    day: 'numeric',
  }).format(date);
}

</script>
