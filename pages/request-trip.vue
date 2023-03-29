<template>
  <div class="min-h-screen flex flex-col justify-center sm:py-12">
    <div class="relative sm:max-w-xl sm:mx-auto">
      <div class="relative px-4 mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        <div class="max-w-md mx-auto">
          <h1 class="text-2xl font-semibold mb-6">Request a Quote</h1>
          <form @submit.prevent="handleSubmit">
            <!-- Payer Details -->
            <div class="space-y-6">
              <h2 class="text-xl font-semibold mb-2">Payer Details</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Payer Name" required class="input" />
                <input type="email" placeholder="Payer Email" required class="input" />
              </div>
              <input type="tel" placeholder="Payer Phone Number" required class="input" />

              <!-- Patient Details -->
              <h2 class="text-xl font-semibold mb-2">Patient Details</h2>
              <input type="text" placeholder="Patient Name" required class="input" />

              <!-- Trip Details -->
              <h2 class="text-xl font-semibold mb-2">Trip Details</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="date" placeholder="Pickup Date" required class="input" />
                <input type="time" placeholder="Appointment Time" required class="input" />
              </div>
              <input type="text" placeholder="Pickup Address" required class="input" />
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="text" placeholder="Unit Number" class="input" />
                <input type="text" placeholder="City" required class="input" />
              </div>
              <input type="text" placeholder="Drop-off Location" required class="input" />
              <input type="time" placeholder="Latest Drop-off Time" required class="input" />

              <!-- Submit Button -->
              <button type="submit" class="btn btn-primary w-full mt-6">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Request Trip - Roga Medical Transport Services"
});
const handleSubmit = () => {
  // console.log('submitting form');
};
</script>

<style scoped>
.input {
  @apply border border-gray-300 rounded-md px-4 py-2 w-full bg-gray-300 text-gray-700;
}
</style>