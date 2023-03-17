<template>
  <div class="hero-section bg-gradient-to-b from-base-200 to-transparent py-16 px-8 text-white">
    <div class="container mx-auto">
      <div class="text-center">
        <h1 class="text-4xl font-bold mb-4">Welcome to Ryan's Medical Transport Services</h1>
        <p class="text-xl mb-8">We provide reliable and convenient transportation for patients to and from medical
          appointments. Our dedicated drivers ensure a comfortable and timely experience, allowing you to focus on your
          health.</p>
        <CTAButton href="/request-trip">
          Request a Trip
        </CTAButton>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroSection',
};
</script>

<style scoped>
.btn-primary {
  background-color: #EF4444;
  color: white;
}
</style>
