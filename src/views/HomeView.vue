<template>
    <div class="container grid grid-nogutter surface-section text-800">
        <div class="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center">
            <section>
                <span class="block text-6xl font-bold mb-1">VendoVote</span>
                <div class="text-6xl text-primary font-bold mb-3">
                    Secure and transparent vendor selections with ease
                </div>
                <p class="mt-0 mb-4 text-700 line-height-3">
                    VendoVote leverages advanced blockchain technology to ensure that our vendor
                    selection process is not only efficient but also highly secure and transparent.
                </p>

                <Button label="Connect Metamask" type="button" class=""></Button>
            </section>
        </div>
        <div class="col-12 md:col-6 overflow-hidden">
            <img
                id="illustration"
                src="@/assets/voting-illustration.svg"
                alt="E-voting illustration"
                class="md:ml-auto block md:h-full"
            />
        </div>
    </div>
</template>

<style scoped>
#illustration {
    width: 100%;
}
</style>
