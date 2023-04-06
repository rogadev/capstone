<template>
  <div class="min-h-screen flex flex-col justify-center sm:py-12">
    <div class="relative sm:max-w-xl sm:mx-auto">
      <div class="relative px-4 mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        <div class="max-w-md mx-auto">
          <div class="prose mb-8">
            <h2>Thank you for your interest in our services!</h2>
            <p>However, we are not taking on new clients at this time.</p>
          </div>
          <h1 class="text-2xl font-semibold mb-6">Request a Quote</h1>
          <form @submit.prevent="handleSubmit">
            <!-- Payer Details -->
            <div class="space-y-6">
              <h2 class="text-xl font-semibold mb-2">Payer Details</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input disabled type="text" placeholder="Payer Name" required class="input input-disabled" />
                <input disabled type="email" placeholder="Payer Email" required class="input input-disabled" />
              </div>
              <input disabled type="tel" placeholder="Payer Phone Number" required class="input input-disabled" />

              <!-- Patient Details -->
              <h2 class="text-xl font-semibold mb-2">Patient Details</h2>
              <input disabled type="text" placeholder="Patient Name" required class="input input-disabled" />

              <!-- Trip Details -->
              <h2 class="text-xl font-semibold mb-2">Trip Details</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input disabled type="date" placeholder="Pickup Date" required class="input input-disabled" />
                <input disabled type="time" placeholder="Appointment Time" required class="input input-disabled" />
              </div>
              <input disabled type="text" placeholder="Pickup Address" required class="input input-disabled" />
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input disabled type="text" placeholder="Unit Number" class="input input-disabled" />
                <input disabled type="text" placeholder="City" required class="input input-disabled" />
              </div>
              <input disabled type="text" placeholder="Drop-off Location" required class="input input-disabled" />
              <input disabled type="time" placeholder="Latest Drop-off Time" required class="input input-disabled" />

              <!-- Submit Button -->
              <button type="submit" class="btn btn-primary w-full mt-6 btn-disabled" disabled>Submit</button>
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
  // TODO
};
</script>

<style scoped>
.input {
  @apply rounded-md px-4 py-2 w-full;
}
</style>