import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { images } from "@/constants";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SingUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const submitHandler = () => {};
  return (
    <SafeAreaView className="bg-primary h-full ">
      <ScrollView>
        <View className=" justify-center min-h-[85vh] px-4 my-6">
          <View className="w-full justify-center items-center  px-4">
            <Image
              source={images.logo}
              className="w-[115px] h-[35px]"
              resizeMode="contain"
            />
            <Text className="text-2xl text-white font-bold  text-semibold mt-10 font-psemibold">
              Log in to Aora
            </Text>
          </View>
          <FormField
            title="User name"
            placeholder="Enter your user name"
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
            keyboardType="default"
            otherStyle="mt-7"
          />

          <FormField
            title="Email"
            placeholder="Enter your email"
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
            keyboardType="email-address"
            otherStyle="mt-7"
          />

          <FormField
            title="Password"
            placeholder="Enter your password"
            value={form.email}
            onChangeText={(text) => setForm({ ...form, password: text })}
            keyboardType="visible-password"
            otherStyle="mt-7"
          />

          <CustomButton
            title="Sign Up"
            handlePress={() => {
              submitHandler();
            }}
            containerStyle="mt-7"
            isLoading={isSubmit}
          />

          <View className="flex-row justify-center  pt-5  gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Already have an account?
            </Text>
            <Link
              href="/singIn"
              className="text-lg font-psemibold text-secondary-100"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingUp;

const styles = StyleSheet.create({});
