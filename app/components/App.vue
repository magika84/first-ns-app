<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label :text="'fa-bars' | fonticon" class="fa" @tap="$refs.drawer.nativeView.showDrawer()" col="0"/>
                
                <Label class="title" text="Pilot Voice"  col="1"/>
            </GridLayout>
        </ActionBar>

        <RadSideDrawer ref="drawer">
            <StackLayout ~drawerContent backgroundColor="#ffffff">
                <Label class="drawer-header" text="Profile"/>

                <Label class="drawer-item" text="Home"/>
                <Label class="drawer-item" text="Settings"/>
                <Label class="drawer-item" text="Sign In"/>
            </StackLayout>

            <GridLayout ~mainContent columns="*" rows="*">
            <ListView class="list-group" for="script in scripts" @itemTap="onItemTap"
            style="height:1250px">
            <v-template>
                <FlexboxLayout flexDirection="row" class="list-group-item">
                    <Label textWrap="true" :text="script.line" class="list-group-item-heading" style="width: 100%" />
                </FlexboxLayout>
            </v-template>
        </ListView>
             /*   <Label class="message" :text="msg" col="0" row="0"/>*/
            </GridLayout>
        </RadSideDrawer>
    </Page>
</template>

<script>
  export default {
      methods: {
            onItemTap: function(args) {
                console.log("Item with index: " + args.index + " tapped");
            }
        },
    data() {
      return {
          scripts: [{
                        line: "Lockhart traffic, Tomahawk  91372, downwind 18, Lockhart",
                        
                    },
                    {
                        line: "Lockhart traffic, Tomahawk  91372, downwind 36, Lockhart",
                        
                    },
                    {
                        line: "Lockhart traffic, Tomahawk  91372, base 18, Lockhart",
                       
                    },
                   
                ]
       // msg: 'Hello Pilot Voice!'
      }
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #153eaf;
        color: #ffffff;
    }

    .title {
        text-align: left;
        padding-left: 16;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }

    .drawer-header {
        padding: 50 16 16 16;
        margin-bottom: 16;
        background-color: #153eaf;
        color: #ffffff;
        font-size: 24;
    }

    .drawer-item {
        padding: 8 16;
        color: #333333;
        font-size: 16;
    }
</style>
