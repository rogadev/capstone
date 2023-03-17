<script setup>
useHead({
  title: "Medical Transport Services - Reliable and Convenient"
});
const breadcrumbs = [
  { text: 'Home', url: '/' },
  { text: 'How It Works', url: '#how-it-works' },
  { text: 'Fees', url: '#fees' },
  { text: 'Contact Us', url: '#contact' },
];
</script>

<template>
  <public-navbar />
  <HeroSection />
  <Breadcrumbs :breadcrumbs="breadcrumbs" />
  <main class="flex flex-col p-8 items-center">
    <section id="how-it-works" class="prose pt-8">
      <h2 class="text-center">How It Works</h2>
      <ol>
        <li>Request a trip: Fill out our simple form with the necessary details, such as the patient's information, pickup
          and drop-off locations, dates, and times. Requests must be made at least 36 hours in advance.</li>
        <li>Confirmation: Our drivers review and approve trip requests approximately 24 hours before the scheduled pickup
          time. You'll receive a confirmation email once the trip is approved.</li>
        <li>Transportation: On the day of the appointment, the driver will pick up the patient according to the
          agreed-upon schedule and safely transport them to their destination. After the appointment, the driver will
          return the patient to their pickup location.</li>
        <li>Billing: Once the trip is complete, an invoice will be sent to the payer. Payments can be made through various
          methods, with net7 or net30 payment terms depending on the client.</li>
      </ol>
    </section>

    <section id="fees" class="prose pt-8">
      <h2 class="text-center">Fees</h2>
      <p>
        Our fees are determined by factors such as distance and location. We offer flat fees for certain routes and can
        provide customized pricing based on your specific needs. For more information on our fees, please <a
          href="#contact">contact us</a>.
      </p>
    </section>

    <section id="contact" class="prose pt-8 text-center">
      <h2>Contact Us</h2>
      <p class="pb-4">
        If you have any questions or require assistance, please feel free to reach out to us. Our team is always happy to
        help.
      </p>
      <ContactUsDetails />
    </section>
  </main>

  <Footer />
</template>
