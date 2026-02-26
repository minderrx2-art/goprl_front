<script lang="ts">
    import Simple from "@/assets/simple.svg";
    import Fast from "@/assets/fast.svg";
    import Private from "@/assets/private.svg";
    import { Card, CardContent } from "@/components/ui/card";
</script>

<footer class="mt-8">
    <Card>
        <CardContent>
            <div
                class="grid grid-cols-2 gap-y-6 gap-x-8 text-sm text-muted-foreground"
            >
                <div class="space-y-8">
                    <div class="flex items-center gap-3 justify-center">
                        <img
                            src={Simple}
                            alt="Simple"
                            class="h-8 w-8 shrink-0"
                        />
                        <span class="font-medium">Simple</span>
                    </div>
                    <div class="flex items-center gap-3 justify-center">
                        <img src={Fast} alt="Fast" class="h-12 w-12 shrink-0" />
                        <span class="font-medium">Fast</span>
                    </div>
                </div>
                <div class="space-y-4">
                    <div class="flex items-center gap-3 justify-center">
                        <img
                            src={Private}
                            alt="Anonymous"
                            class="h-8 w-8 shrink-0"
                        />
                        <span class="font-medium">Anonymous</span>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
</footer>
